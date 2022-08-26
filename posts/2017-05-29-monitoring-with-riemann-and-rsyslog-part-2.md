---
title: Monitoring with Riemann and rsyslog part 2
layout: post
author: Bob
tags:
    - riemann
    - monitoring
    - elk
    - archive
---

It's been a little longer than I expected, but I'm finally back and working on Rsyslog.
Last time [http://io.made.com/blog/monitoring-with-riemann-and-rsyslog-part-1/], we
looked at how impstats could be used to generate internal metrics from Rsyslog, and how
to alert on those metrics in Riemann.

This time I want to look at how the Dynstats module
[http://www.rsyslog.com/doc/master/configuration/dyn_stats.html] in Riemann can be used
to do more interesting monitoring of our applications.

The Dynstats module provides a simple interface for counting events in Rsyslog. Any time
we see a particular pattern in our logs, or we receive a log file from a particular
application, we can increment a counter.

For our first use-case, we're going to use this to record error counts for each of our
applications. This is one of the simplest and most important metrics that you can
capture since most production issues will cause an increase in error rate. When the
"Error Rate > Threshold" alarm goes off, it could be a bad deploy, a misconfigured app,
a bug in your code, or a failing disk on the database server. While you definitely want
more granular metrics to help you diagnose problems, this broad approach is fantastic as
an early warning system.

For this post, I've put together a docker-compose playground
[https://github.com/bobthemighty/rek-stack-demos]. If you want to play along, you'll
need a recent version of Docker Compose. Check out the code, and take a look in the
dynstats/dummy directory.

To demonstrate a error counter, I've written a quick and dirty Go program that randomly
outputs either a notice or error level log at regular intervals. We can set the
interval, log tag, and error percentage on the command line.

docker-compose run dummy -interval 100 -tag foo

We can use the dynstats functionality in Rsyslog to count the number of errors that
happen in a 10-second window, and send the counter over to Riemann.

# We use the dyn_stats function to create a new metrics bucket.

# Each bucket can contain many counters.

dyn_stats(name="error_rate")

# When we receive an "error" log, we will add 1 to the counter

# for the application that raised the error. We use the $programname

# parsed from the Syslog tag to identify the application.

if
($syslogseverity-text == "error") then { set $foo = dyn_inc("error_rate",
$programname);
}

# Lastly, here's our stats processing.

# Parse the JSON that impstats forwards to us and spit it straight out to Riemann

ruleset(name="stats") { action(name="parse-stats" type="mmjsonparse")
action(name="send-to-riemann" type="omriemann" subtree="!" server="riemann") }

We can bring this up by running docker-compose up from the root of the demo project.
After everything has started up, you should start to see regular metrics counting the
number of errors.

riemann_1 | INFO [2017-05-29 09:26:11,285] defaultEventExecutorGroup-2-1 -
riemann.config - error rate/dummy-logger = 9 riemann_1 | INFO [2017-05-29 09:26:21,259]
defaultEventExecutorGroup-2-1 - riemann.config - error rate/dummy-logger = 16

We can extend our Riemann config so that we raise an error if a metric is above an
absolute threshold. Open the file riemann/riemann.config . We're going to edit the
config to add a new rule: when the error_rate is > 10, log an error. In practice, we
would want to send an alert to an operator via email, Slack, or PagerDuty. Add the
following line below the prn on line 13:

        (where (< 10 metric) #(error "Alert! error rate is now " (:metric %)))

Restart everything with docker-compose restart and wait a few seconds. You should start
to see output like this:

riemann_1 | INFO defaultEventExecutorGroup-2-1 - riemann.config - error
rate/dummy-logger = 9 riemann_1 | INFO defaultEventExecutorGroup-2-1 - riemann.config -
error rate/dummy-logger = 15 riemann_1 | ERROR - Alert! error rate is now 15

For our second use case, we're going to look at how dynstats and riemann can give us
some monitoring of web applications. One of the strong points of rsyslog is its ability
to rapidly parse large amounts of log text and pull out meaningful fields. Rsyslog can
parse logs fast enough that we can use it for realtime monitoring of applications. Using
mmnormalize, dynstats, and omriemann we can monitor our web applications in
near-realtime and see a breakdown of HTTP status codes.

Returning to our rsyslog config, we've got the following block at the bottom of the file

# http logs

dyn_stats(name="http response")

action(type="mmnormalize" ruleBase="/etc/rsyslog-http.rb")

if $!event.tags contains "http" then { set $foo = dyn_inc("http response", $!status) }

Here we configure a new bucket named "http response". Every log line that comes through
is matched to an mmnormalize rulebase that tries to parse the log as an HTTP access log.
If the line matches, we pull out some fields - status code, request url, response time
etc. - and tag the log as "http". We use that tag decide whether we have an http log and
increment the counter for the status code. The rulebase contains 4 lines that look like
this:

rule=http:%remote_addr:word% %ident:word% %auth:word% [%timestamp:char-to:]%]
"%method:word% %request:word% HTTP/%httpversion:float%" %status:number%
%bytes_sent:number% "%referrer:char-to:"%" "%agent:char-to:"%"

These rules set up a tag (http) and a pattern to match. We set up 4 rules to account for
extra data at the end of the log line, and leading spaces.

The docker-compose project includes an nginx container that is configured to send logs
to rsyslog. I've added some dummy endpoints to the configuration so that we can use curl
to generate some web logs:

-   /200 returns a 200 OK
-   /300 returns a 301 Moved Permanently to /200
-   /400 returns a 404 Not Found
-   /500 returns a 500 Internal Server Error.

Curling these endpoints and waiting a few seconds, we should see some new metrics arrive
in Riemann:

riemann_1 | INFO defaultEventExecutorGroup-2-1 - riemann.config - http responses/200 = 3
riemann_1 | INFO defaultEventExecutorGroup-2-1 - riemann.config - http responses/302 = 1
riemann_1 | INFO defaultEventExecutorGroup-2-1 - riemann.config - http responses/404 = 1

The code is still rough around the edges, but hopefully you can see how omriemann can
make it easier to monitor applications given only their log files. Next time I want to
talk about a third way to use omriemann: custom metrics in json.
