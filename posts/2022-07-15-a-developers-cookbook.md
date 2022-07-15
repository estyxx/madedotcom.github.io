---
title: A developer's cookbook
author: Gil
tags:
    - developer experience
---

Remember the cookbooks from the past? The ones made of paper, not store bought ones, but
written by real people on used, old notebooks by the person who cooked them, copied from
other people's cookbooks and wrote about a recipe some friend told them about.

I think this concept of cookbook/journal can be used for us developers in an even easier
way. Here's the scenario, someone asks you to extract some data from a service you
manage, you write a script to get that data because you need to post-process it or
because you hate SQL for some reason. What will happen to that script? Realistically, if
nobody asks you for that data again, it'll live on your computer until it breaks and you
forget to back it up because it's in some `tmp` folder.

What if you had a place to store that script? It's just a one-off so we don't need super
documentation or to be code-reviewed because its purpose has been fulfilled, but what if
someone else asks you to do a similar data report that you could base off of that
script? Or even reuse it with some small changes to variables? What if your colleague
was asked the same thing while you were on holiday? What if they asked you to re-run the
script and you already forgot where it was? These are reasons why I think you should
keep your one-off scripts saved up and shared somehow.

And this is where the "Developer's Cookbook" comes in, I like having a repository called
"Gil's cookbook" ideally on the company's git repository so that when I leave the
company, my fellow colleagues can still take advantage of it, but also so I don't have
to handle permissions/sharing.

The next stage is to tell people about my cookbook and to link it when people ask you
for help, or scripts to run something, this way they'll be aware of it, and it's OK to
become your own index of the cookbook for a while until it comes a point where people
just know where to look instead of asking you.
