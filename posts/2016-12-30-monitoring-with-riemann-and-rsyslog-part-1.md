---
title: Monitoring with Riemann and rsyslog part 1
layout: post
author: Bob
tags:
    - riemann
    - monitoring
    - elk
---

In a previous post [https://io.made.com/blog/rek-it/] I said I was interested in
replacing Logstash with Rsyslog in our ELK stack. I've been working on one of the
outstanding items from that project - the ability to send metrics to Riemann. The
Made.com [https://github.com/madedotcom/rsyslog/tree/omriemann] fork of Rsyslog now has
an alpha-quality version of the Riemann output module. Although there's still some
missing functionality for more advanced scenarios, we can already do interesting things
with the module as it stands.

For our first example, let's imagine that we want to trigger an alert if our log volume
changes drastically. For example, we may stop receiving events if there is a networking
problem; or we might start writing many more events than usual if there is an error in
one of our systems.

We can achieve this with the rsyslog impstats module and the riemann output module.

Firstly we need to configure rsyslog to record its statistics.

### We'll need to load the riemann module before we can use it

module(load="omriemann")

#impstats generates internal metrics for us on an interval module(load="impstats" # use
a json format format="cee" # send metrics every 10 secs interval="10" # send a
rate-of-change event, like a collectd counter. resetCounters="on" # pass these messages
to the "stats" ruleset for processing ruleset="stats") module(load="mmjsonparse")

ruleset(name="stats") { # parse the json message action(name="parse-stats"
type="mmjsonparse")

    # pass it to riemann
    action(name="riemann-output" type="omriemann"
           # look for metrics in the root json object
           subtree="!"

           # and forward them to MYSERVER
           server="MYSERVER")

}

Secondly, we need to add some config to Riemann.

; Listen for TCP connections (let [host "0.0.0.0"] (tcp-server {:host host}))

(streams ; ignore riemann's internal metrics (where (not (tagged "riemann")) ; write all
incoming events to stdout prn ))

After we start both processes up, we should start seeing logs like this from Riemann.

{:service "parse-stats/processed", :state "ok", :metric 5 }

{:service "riemann-output/processed", :state "ok", :metric 5}

So how can we use this to trigger alerts? Firstly let's add some more config to rsyslog.
We're going to listen to a TCP socket and we want to monitor the number of messages we
receive.

module (load="imuxsock") input (type="imuxsock" ruleset="sock"
Socket="/run/rsyslog/imux.sock")

ruleset(name="sock") { action(name="write-to-file" type="omfile" file="/var/log/tcp") }

Now we can write some logs into rsyslog with the logger utility, and we should start
seeing new metrics in Riemann.

{:service "imuxsock/submitted", :state "ok" :metric 2}

{:service "write-to-file/processed", :state "ok", :metric 2}

To raise an alert based on these metrics we're going to set some arbitrary thresholds,
but we could do more sophisticated analysis to do anomaly detection. We'll set up the
following rules:

-   If we receive fewer than 10 messages in 5 minutes, we should send an email.
-   If we receive more than 100 messages in 5 minutes, we should send an email.
-   Once the log rate settles down to between 10 and 100 messages per 5 mins, we should
    send an email to say that everything has returned to normal.

We'll update our riemann config to look like this

(def email (mailer {:host "smtp.mydomain.com" :user "foo" :pass "bar" :from
"riemann@mydomain.com"}))

(streams

    (where (service "imuxsock/submitted")
      ; set up a moving time window over the last 5 mins
      (moving-time-window 300; 300 secs == 5 mins
        ; we want the total number of messages received over the period
        (smap folds/sum
          ; this helper maps threshold values to states
          (pipe p (splitp > metric
              10 (with :state "error" p) ; < 10 is an error
              100 (with :state "ok" p)   ; < 100 is ok
              Integer/MAX_VALUE (with :state "error" p)); anything 100 to infinity is an error

             ; If the state changes (from, ok to error or the other direction)
             (changed-state
             ;   (email “sysops@mydomain.com”)
                prn

              ))))))

After we update our config, and wait a few minutes, we should see an error logged by
riemann.

{:service "imuxsock/submitted", :state "error", :metric 0}

We can test the resolution by running logger again, but this time using watch to run it
every 5 seconds: watch -n5 logger "hello world". After another few minutes, riemann
should log the ok event.

{:service "imuxsock/submitted", :state "ok", :metric 60}

Lastly, if we change our watch statement so that we call logger every second, we can
trigger the other threshold.

{:service "imuxsock/submitted", :state "error", :metric 188}

We've only scratched the surface of Riemann's capabilities here, but we can already see
how Rsyslog and Riemann can work together to give actionable alerts from our log data.
