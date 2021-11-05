---
title: Riemann workshop materials
layout: post
author: Bob
tags:
  - riemann
  - talks
---

Last year we held a Riemann workshop for our developers. The materials for the workshop
[https://github.com/madedotcom/riemann_workshop] were open-sourced but I never actually
got around to promoting them in any way so they've just languished, like that bag of
salad at the back of the fridge, slowly softening to a soggy senescence.

Since I've been writing about Rsyslog and Riemann [https://io.made.com/blog/tag/rek/],
though, it seemed like a good time to resurrect my hard work and share it more widely.
This workshop will walk you through monitoring both technical metrics and business
metrics using Riemann [http://riemann.io/] and Collectd [https://collectd.org/], plus
storing and querying them with Influx [https://www.influxdata.com/], and graphing them
in Grafana [https://grafana.com/].

I'm hoping this will help someone else get started with this stack, which is extremely
powerful, but has a steep learning curve.

To get started, just check out the repository
[https://github.com/madedotcom/riemann_workshop] and then from the root run
docker-compose up. You should see an enormous and confusing wall of text.

There are a bunch of Markdown files in the /docs/ directory that will give you a quick
rundown of how to configure and extend Riemann. If you've any questions or feedback, I'd
be overjoyed to hear from you on twitter [https://twitter.com/bob_the_mighty].
