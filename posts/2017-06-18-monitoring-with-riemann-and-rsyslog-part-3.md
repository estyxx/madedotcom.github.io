---
title: Monitoring with Riemann and rsyslog part 3
layout: post
author: Bob
tags:
  - riemann
  - monitoring
  - elk
---

Back in December I said I was interested in replacing Logstash with Rsyslog
[https://io.made.com/blog/rek-it/], but that we needed a Riemann module to cover some of
our existing functionality. Specifically we send metrics to Riemann from Logstash for
three reasons:

1.  We send internal metrics from Logstash to monitor how events flow through our log
    pipeline.
2.  We forward all ERROR and CRITICAL logs to Riemann, which performs roll-up and
    throttling. Errors are forwarded to Slack, and Criticals are sent to Pagerduty.
3.  We allow developers to send application metrics in their structured log.

After some leisurely hacking over the last few days, I've got a Riemann module that
should cover all of our needs. We should be able to replace the internal metrics with
impstats [https://io.made.com/blog/monitoring-with-riemann-and-rsyslog-part-1/] as
discussed in part one of this series, so we won't touch on that here.

As before I've created a docker-compose playground on GitHub. This time the code is
under the /custom-metrics directory.

Let's see how ERRORs and CRITICALs can be sent to Riemann.

We strongly encourage our developers to use structured logging in their applications;
rather than simply logging text, we log JSON objects. This allows us to add more context
into our logs, which makes it simpler to aggregate and search in Kibana.

A typical structured log might look like this:

{ "@timestamp": "2017-06-02T13:17:29.594Z", "@version": "1", "@message": "Incoming
request: GET /groups/GB/cat-16631", "@fields": { "request_path": "/groups/GB/cat-16631",
"request_method": "GET", "requestid": "da11e322-fbba-4f7a-a638-621da3888017",

      "levelno": 20,
      "levelname": "INFO",

      "pathname": "./app.py",
      "filename": "app.py",
      "lineno": 119,

      "group_id": "cat-16631",
      "name": "availability-api",
      "country": "GB"
    }

}

As well as the obvious timestamp and textual message fields, we also include some
information about the request we're handling, including a correlation id, some debugging
information so we can work out where the log was written, and some data from the
application.

We also get logs from the Systemd Journal, and from third party and legacy applications,
so firstly we want to normalise the logs into a common format. As before, we're going to
use mmnormalize for this task. Our mmnormalize rulebase
[https://github.com/bobthemighty/rek-stack-demos/blob/master/rek/custom-json-metrics/rsyslog/rsyslog-http.rb]
handles 3 kinds of logs: http access logs from nginx, structured json logs from our
Python API, and log4j style logs from our processing app.

Firstly, we use mmnormalize to parse these different log formats into a json structure,
with a tag so we know what kind of data we have. We're going to set a severity field on
the json according to some simple rules.

For http logs, we'll use INFO as our severity level if we have a status code < 400,
otherwise ERROR. For plain text and json logs, we'll convert the log4j log-level name
into a syslog-severity
[http://www.kiwisyslog.com/help/syslog/index.html?protocol_levels.htm].

- INFO -> info (6)
- WARN -> warn (4)
- ERROR -> error (3)
- CRITICAL -> critical (2)
- FATAL -> emergency (0)

(action type="mmnormalize" rulebase="/etc/rsyslog/rules.rb")

# If this is an http log, use the status code

if
($!event.tags contains "http" and $!status >= 400) then { set $!severity = 3; set
$!body!@fields!levelname
= "error";

#

# If we have a json log with a level name, map it back to a severity

} else if ($!body!@fields!levelname != "") then { set $!severity =
cnum(lookup("log4j_level_to_severity", $!body!@fields!levelname)); }

Now that we've got a normalised log level, we can use it to forward errors to Riemann:

if ($syslogseverity <= 3) then {

(action type="omriemann" server="riemann" prefix="errors" description="!msg") }

By default omriemann uses the $programname as the "service" key in the Riemann message.
The prefix configuration setting prepends a fixed value to the service. When we send
errors through this configuration, we should see new metrics arriving in Riemann that
look like this:

{:service "errors/my-application" :metric 1 :description "a terrible thing occurred" }

With a sprinkling of Riemann magic, we can set up Slack and Email notifications with an
hourly summary of errors across our applications.

Several of our applications are sending metrics to Riemann via the logging pipeline.
We're moving away from this technique because it creates a dependency between our ELK
stack and our metrics: when Logstash stops stashing, we lose monitoring as well as logs.
Despite the flaws of this practice, it's simple to explain to developers, and simple for
QA to verify, since it works by writing json to stdout.

A typical metric log might look like this:

{ "@message": "Request completed: 200 - 0.003793478012084961ms.", "@timestamp":
"2017-06-02T06:24:46.517Z", "@fields": { "requestid":
"bfc153b2-a014-4a52-9090-46a1e3bf80da", "levelname": "INFO",

      "_riemann_metric": {
        "metric": 0.003793478012084961,
        "ttl": 60,
        "service": "availability.api.single_product.response_time",
        "state": "ok",
        "attributes": {
          "status_code": 200
        }
      }

    },
    "@version": "1",

}

Here we have the same basic structure as our previous structured log, but with the
inclusion of a new field \_riemann_metric. This metric represents the response time for
a single invocation of an API end point, and it includes the status code. We want to
pass this structure to Riemann.

if($!\_riemann_metric != "") then {

action(type="omriemann" server="riemann" subtree="!body!@fields!\_riemann_metric"
mode="single") }

As in previous articles, we're calling omriemann with a subtree that contains our metric
data. This time, however, we're using mode=single. This tells omriemann that every
message contains a single metric, and that the fields of the json subtree should be
mapped to the fields of the Riemann message. This is different to our previous examples,
where we expect that each field of the subtree is a different metric.

As before, I've included a dummy web application that returns a hard-coded status code
at each endpoint. This time, you can include a sleep time in milliseconds: curl
localhost/404?sleep=100.

This will result in a metric log being sent to Rsyslog and through to Riemann so that we
can alert and report on it.

Now that I can reproduce our Logstash/Riemann integration with Rsyslog, I can begin the
process of building a new REK stack.
