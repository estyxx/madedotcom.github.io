---
title: Testing quadrants test levels and testing types
layout: post
author: Guru
tags:
  - testing
redirect_from: "/testing-quadrants-test-levels-and-testing-types/"
---

**WHAT ARE TESTING QUADRANTS ?**

_Testing quadrants_, defined by [Brian Marick](http://exampler.com/about.html), align
the [test levels](http://istqbexamcertification.com/what-are-software-testing-levels/)
with the appropriate
[test types](http://istqbexamcertification.com/what-are-software-test-types/) in the
**Agile methodology**.

The testing quadrants model, **helps to ensure that all important test types and test
levels are included in the development lifecycle**. This model also provides a way to
differentiate and describe the types of tests to all stakeholders, including developers,
testers, and business representatives.

In the testing quadrants, tests can be business (user) or technology (developer) facing.
Some tests support the work done by the Agile team and confirm software behaviour. Other
tests can verify the product. Tests can be fully manual, fully automated, a combination
of manual and automated, or manual but supported by tools.

The four quadrants are as follows
![](http://res.cloudinary.com/mwhelan/image/upload/v1429257891/teststack/readmeio/AgileTestingQuadrants.png)

The quadrants are not in any specific order. Also there are no hard and fast rules about
what goes in what quadrant. Teams think through them as they do the release and
iteration planning, so the whole team starts out by thinking about testing.

**WHAT DOES EACH QUADRANT MEAN**

The quadrants largely help the agile team to plan their testing for a project and make
sure they have all the resources they need to accomplish it successfully .

_Q1 - Quadrant1_ is a developer lead effort and it is technology facing, the effort
applied in this quadrant helps to support the scrum team. This involves getting complete
structural or conditional unit test coverage, plus,
[component testing](http://istqbexamcertification.com/what-is-component-testing/)
coverage as well. This helps to make sure that, **are we building the product right?**
**NOTE :** with out this quadrant every other quadrant is not that effective and gets
harder.

_Q2 - Quadrant2_ Business-facing tests that supports the scrum team as well. This
involves capturing business examples and collaborating with customers to get more
clarity in asserting the functionality, story testing, API testing, UI based testing
using automated tools like selenium. This helps to make sure that, **are we building the
right product?**

_Q3 - Quadrant3_ This involves recreating actual user experience and have scenario which
are realistic. This relates to regular sprint demos or Informal demos, involving the
real users/Customer support teams and get early and quick feedback.

_Q4 - Quadrant4_ This is technology facing but involves use of tools to assist in
understanding the behaviours. Memory management, Data migration, Recovery, Test
environments etc, are covered under this quadrant and stories written for it. Popular
**'ilities' testing** like modifiability, usability, adaptability, reusability,
security, reliability, availability etc must also be considered as well.

**HOW TO USE IT IN AGILE ?** Test planning is not an individual effort and must be
acknowledged by the whole team at the release planning or iteration planning. At release
planning the team must understand and agree to the high level test strategy which
encompass Unit testing/TDD, ATDD, function/Non functional testing etc - considering all
quadrants. Identify who should own or do the various type of testing and how best to
accomplish it, shared responsibility and focus on collaboration is the essence of this
step. The team gets to highlight the requirement for any special skills or tools. At
each iteration planning or execution, tests from any quadrant can be created as story
and performed.

No story can be considered as done until testing is completed: Unit testing complete,
automated regression tests successful run,customer requirements has been confirmed to be
captured. Doneness in all quadrants achieved !
