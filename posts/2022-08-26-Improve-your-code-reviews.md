---
title: Improve your code reviews
author: Gil
tags:
    - developer experience
---

The other day I watched a very interesting
[video about code reviews](https://www.youtube.com/watch?v=_SJL7vepQvU). In the video,
the author explains how they did some experiments changing the order of files shown to
reviewers and their results on how easy it was for reviewers to spot bugs based on
whether the files with the bugs were shown first or later.

You should watch the video, because I’m going to spoil it. The results were that when
the bug in the PR was on the first file, reviewers were 175% more likely to spot them,
the same thing happened when the bug was in the tests, the reviewers who looked at the
tests first (because they were sorted tests-first in the review program) were 250% more
likely to find the bug in the tests.

The author then has a few recommendations about what to do to help reviewers find bugs
more easily such as the author of the PR offering a guide to the reviewer to help them
spot the more difficult areas. I like also to let reviewers know about what I’m looking
for in their review (for example: What do you think about this pattern I used to solve
this problem?) this way, the reviewer can focus on those areas as part of the review.

I was thinking that as a reviewer, one thing I could do to be able to do good reviews is
to have my own checklist of things to look for in a review (we can’t expect the author
to always tells us what to look for), I haven’t used it much to be honest, I think it
makes the review a bit stricter and less fun, but it will probably make my reviews
better in the future.

---

<br / >

### The code review checklist

-   [ ] Read the ticket
-   [ ] Read the PR
-   [ ] Read the tests
-   [ ] Read the implementation
