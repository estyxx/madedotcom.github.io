---
title: Dependency Injection with type signatures in python
layout: post
author: Bob
categories:
    - ports & adapters
tags:
    - python
    - architecture
    - archive
---

Dependency injection is not crazy, not un-pythonic, and not enterprisey. Here's
Wikipedia:

In software engineering, dependency injection is a technique whereby one object supplies
the dependencies of another object. A dependency is an object that can be used (a
service). An injection is the passing of a dependency to a dependent object (a client)
that would use it. The service is made part of the client's state. The intent behind
dependency injection is to decouple objects to the extent that no client code has to be
changed simply because an object it depends on needs to be changed to a different one.

In other words, Dependency Injection (DI, for all you jargon-fans out there) is when an
object is given its dependencies instead of reaching out to get them by itself. For
example, in this series we're building a system for managing IT support issues. Last
time we had a requirement to send an email when an issue was assigned to an engineer.
Our handler is orchestration code that plugs together two collaborators: a View Builder
that fetches data, and an Email Sender that knows how to send an email to the mail
server.

```python
class IssueAssignedHandler:

    def __init__(self, sender: EmailSender, view: IssueViewBuilder):
        self.sender = sender
        self.view = view

    def handle(self, msg):
        data = self.view.fetch(cmd.issue_id)
        sender.send_email(emails.IssueAssigned, data)
```

This is dependency injection. We're injecting the dependencies (the sender and view) by
making them parameters of the constructor. That's it. Passing our parameters this way
makes them more explicit, and so reduces the overall quantity of Unpleasant Surprise
hiding in the system. Because I'm providing all my dependencies from outside of my
handler, I can change them easily, or provide fakes. This helps to keep the system
loosely-coupled and flexible. It also means that I have to think about what the
dependencies of my system ought to be, and that helps me to define meaningful
abstractions.

Dependency injection is really just a way of performing
[partial application](https://www.pydanny.com/python-partials-are-fun.html) on a method
call. Earlier in this series, I said that I often create handlers by abusing the
`__call__` magic method.

```python
class IssueAssignedHandler:

    def __init__(self, sender, view):
        self.view = view
        self.sender = sender

    def __call__(self, cmd):
        data = self.view.fetch(cmd.issue_id)
        sender.send_email(emails.IssueAssigned, data)

handler = IssueAssignedHandler(sender, view) handler(cmd)
```

Calling the constructor of IssueAssignedHandler returns a callable. Compare that with
the following examples of partial application:

```
def explicit_closure_handler(self, sender, view):

    def h(self, cmd):
        data = view.fetch(cmd.issue_id)
        ...
    return h


handler_a = explicit_closure_handler(sender, view) handler_a(cmd)

from functools import partial def send_assignment_email(sender, view, cmd): data =
view.fetch(cmd.issue_id) ...

handler_b = partial(send_assignment_email, sender, view) handler_b(cmd)
```

The callables handler, handler_a, and handler_b all take a single argument (the command)
and run the same code on it, so we can see that they are functionally equivalent.
Dependency injection is just a way of parametising the behaviour of our applications by
partially applying function arguments.

The advantage of building a system this way is that it's very easy to test, configure,
and extend the behaviour of our application through composition. Dynamic languages offer
many ways to fake the behaviour of a component, but my preference is to write explicit
fakes and stubs, and to pass them as constructor arguments. This forces me to think
about my system in terms of composable parts, and to identify the roles that they play.
Instead of directly calling the database from my handler, I'm providing an
IssueViewBuilder. Instead of writing a load of SMTP code in my handler, I'm providing an
instance of EmailSender.

This, for me at least, is the simplest, most obvious, and least magical way of dealing
with dependencies, especially across architectural boundaries. Performing dependency
injection - whether by constructor injection or partial application, or some magic
property-filling decorator - is mandatory if you want to do ports and adapters. It's the
"one weird trick" that allows high-level code (business logic) to remain completely
isolated from low level code (database transactions, file operations, email sending
etc.)

You don't need to use a framework for DI Dependency injection gets a bad rap in the
Python community for reasons that escape me. I think it's because people assume that you
need to use a framework to perform the injection, and they're terrified of ending up in
an xml-driven hellscape like
[Spring](https://memorynotfound.com/spring-mvc-xml-configuration-example/). This isn't
true, you can still perform dependency injection with no frameworks at all. For example,
in the code sample for the previous part in this series, I extracted all my wiring into
a single module with boring code that looks like this:

```python
db = SqlAlchemy('sqlite:///issues.db') db.configure_mappings() db.create_schema()

bus = MessageBus() db.associate_message_bus(bus)

issue_view_builder = IssueViewBuilder(db) issue_list_builder = IssueListBuilder(db)

report_issue = ReportIssueHandler(db.unit_of_work_manager) assign_issue =
AssignIssueHandler(db.unit_of_work_manager) triage_issue =
TriageIssueHandler(db.unit_of_work_manager) issue_assigned =
IssueAssignedHandler(issue_view_builder, LoggingEmailSender())
bus.subscribe_to(msg.ReportIssueCommand, report_issue)
bus.subscribe_to(msg.TriageIssueCommand, triage_issue)
bus.subscribe_to(msg.IssueAssignedToEngineer, issue_assigned)
bus.subscribe_to(msg.AssignIssueCommand, assign_issue)
```

This code is just a straight-line script that configures the database, creates all of
our message handlers, and then registers them with the message bus. This component is
what an architect would call a
[Composition Root](http://blog.ploeh.dk/2011/07/28/CompositionRoot/). On my current
teams, we tend to call this a bootstrap script. As systems grow, though, and
requirements become more complex, this bootstrapper script can become more repetitive
and error-prone. Dependency injection frameworks exist to remove some of the
boiler-plate around registering and wiring up dependencies. In recent years the
.Net-hipster crowd have started to move away from complex dependency injection
containers in favour of simpler composition roots. This is variously known as poor man's
DI, pure DI, or artisinal organic acorn-fed DI.

Usually, on our Python projects at Made.com, we use the
[inject](https://pypi.python.org/pypi/Inject/3.1.1) library. This is a simple tool that
performs the partial application trick I demonstrated above. Inject is my favourite of
the Python DI libraries because it's so simple to use, but I have a dislike for its use
of decorators to declare dependencies.

```python
import inject

# client code

class IssueAssignedHandler:

    @inject(sender='email_sender', view='issue_view_builder')
    def __init__(self, sender, view):
        pass

    def handle(self, cmd):
        pass


# configuration

def configure_binder(binder): db = SqlAlchemy('sqlite://')
    binder.bind('email_sender', SmtpEmailSender(host=..., port=..., username=...))
    binder.bind('issue_view_builder', IssueViewBuilder)

    inject.configure(configure_binder)

    handler = IssueAssignedHandler()
```

The configure_binder function takes the place of my bootstrap script in wiring up and
configuring my dependencies. When I call IssueAssignedHandler the inject library knows
that it should replace the sender param with the configured SmtpEmailSender, and that it
should replace the view param with an IssueViewBuilder. The decorator serves to
associate the service ("email_sender") with the parameter ("sender"), but it always
feels inappropriate to have this kind of declaration outside of my composition root.

I've been working on a [prototype DI framework](https://github.com/bobthemighty/punq)
that avoids this problem by using
[Python 3.6's optional type hinting](https://docs.python.org/3/library/typing.html), and
I'd like to show you some use cases.

```python
import punq

# client code

class IssueAssignedHandler: # We use type hints to declare what dependencies we need def
    def __init__(self, sender: EmailSender, view: IssueViewBuilder):
        self.sender = sender
    self.view = view

    def handle(self, cmd):
        pass

# configuration

container = punq.container()

# We can register a singleton instance of a dependency

container.register(EmailSender, SmtpEmailSender(host=..., port=..))

# Or a class that implements a particular service

container.register(UnitOfWorkManager, SqlAlchemyUnitOfWorkManager)

# Or register the service itself

container.register(IssueViewBuilder)

handler = container.resolve(IssueAssignedHandler)
```

So far, so underwhelming. Simple registrations don't really save us anything over the
bootstrap script from earlier. Using a container for this kind of work really only cuts
down on duplication - when I've registered UnitOfWorkManager once, I never have to refer
to it again, whereas in the bootstrap I had to explicitly pass it to every handler. It's
nice not having to decorate my class with dependency injection specific noise though,
instead I can just declare what my dependencies are. As an added bonus, I can run mypy
over my code and it will tell me if I've made any stupid type errors.

There are more useful things we can do with a dependency injection container, though.
For example, maybe we're writing a program that needs to run a bunch of processing rules
over some text. We decide to treat each processing rule as a function and use our
container to fetch them all at runtime.

```python
# string_processing_rule is just an alias

# for a function of str -> str

string_processing_rule = Callable[[str], str]

class StringProcessor:

    def __init__(self, rules: List[string_processing_rule]):
        self.rules = rules

    def process(self, input):
        for rules in self.rules:
            input = rule(input)
        return input

def upper_case(input: str) -> str:
    return str.upper()

def reverse(input: str) -> str:
    return reversed(str)

container = punq.container() container.register(string_processing_rule, upper_case)
container.register(string_processing_rule, reverse)

processor = container.resolve(StringProcessor)

# prints ("DLORW OLLEH")

print(processor.process("hello world"))
```

One of the advantages of using types over using other keys is that they're composable. I
can ask for a List[T] and get all registered instances of some T. This is handy when
you're writing code that processes the same message with a bunch on different steps,
including rules engines and message buses. Having generics in our type system can make
it easier to manage all of our dependencies in other ways, too. For example, I can use
generics to automatically wire up all my message handlers.

```python
class IssueAssignedHandler (Handles[IssueAssignedEvent]): pass
```

Here we're stating that our IssueAssignedHandler is an subtype of the Handles class, and
it has a type parameter for the handled event. Given a module full of these, I can
enumerate the module's types and perform automatic registration.

```python
def register_all(module):
    """ Read through all the types in a module and register them
    if they are handlers"""

    for _, type in inspect.getmembers(module, predicate=inspect.isclass):
        register(type)

def register(type):
    """ If this type is a handler type then register it in the container"""
    handler_service_type = get_message_type(type)
    if handler_service_type is None:
        return container.register(handler_service_type, type)

def get_message_type(type):
    """ If this type subclasses the Handles[TMsg] class, return
    the parameterised type. eg. for our IssueAssignedHandler, this would return
    Handles[IssueAssignedEvent] """

    try:
        for base in type.__orig_bases__:
            if base.__origin__ == services.Handles:
              return base
    except Exception:
        pass

def resolve_handler(event_type):
    container.resolve(Handles[event_type])

class MessageHandler:
    def handle(self, next:MessageHandler):
        pass

class LoggingHandler:

    def __init__(self, next: MessageHandler):
        self.next = next

    def handle(self, msg):
        logging.info("Handling message %s", msg)
        next.handle(msg)

class DefaultHandler:

    def __init__(self, next: MessageHandler, container:punq.Container):
        self.next = next
        self.container = container

    def handle(self, msg):
        handler = container.resolve(Handles[type(msg)])
        handler.handle(msg)

container.register(MessageHandler, DefaultHandler)
container.register(MessageHandler, LoggingHandler)

container.register(Handles[IssueAssigned], IssueAssignedHandler)

bus = container.resolve(MessageBus)

# calls logging handler, and then DefaultHandler

bus.handle(msg)
```

Because each MessageHandler depends on another MessageHandler, punq treats them as a
chain, and injects them into each other like a stack of Russian dolls. I can hear the
Python faithful baying for blood at this point. Why would anyone want to do this when
Python already has such great support for decorators? The only reason to ever do this in
Python is if you want to inject dependencies into your decorators. In the following code
we add two new message handlers, a metrics handler that records the runtime of our
handler pipeline so we can monitor our application, and a de-duplicating handler that
prevents us from handling the same message twice. Both of these require complex
dependencies of their own, so we can delegate their creation to the container.

```python
class MetricsGatheringHandler(MessageHandler):

    def __init__(self, metrics: MetricsCollector, next: MessageHandler):
        self.metrics = metrics

    def handle(self, msg):
        # Record the time taken when we process a message
        with self.metrics.time('command/execution-time'):
            self.next.handle(msg)

class DedeuplicatingHandler (MessageHandler):

    def __init__(self, filter:MessageFilter, next:MessageHandler):
        self.next = next
        self.filter = filter

    def handle(self, msg):
        if self.filter.is_duplicate(msg):
            logging.warn("msg %s is a duplicate. Skipping", msg)
            return

        try:
            self.next.handle(msg)
        finally:
            self.filter.record(msg.id)

ontainer.register(MetricsCollector, StatsdMetricsCollector)
container.register(MessageFilter, InMemoryMessageFilter)
container.register(MessageHandler, MetricsGatheringHandler)
container.register(MessageHandler, DedeuplicatingHandler)
```

# Deduplicates, records metrics, writes a log file, and invokes our Command Handler

container.resolve(MessageHandler).handle(msg)

This is what I meant in the last part when I said that a message bus is a great place to
put cross-cutting concerns. Validation, exception handling, db session management, and
basic logging are all great candidates for decorators on our message bus, and DI makes
it easy for us to write and test those components separately. Next time I want to get
back to the issues codebase and talk about how ports and adapters helps provide
technology agnosticism.
