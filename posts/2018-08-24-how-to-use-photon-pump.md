---
layout: post
title: Using Photon-pump
author: Gil
tags:
  - python
  - open-source
  - photonpump
---

Hello, in this article, I'll try to explain what Photon-pump is, and write an easy
example so you can start using it for your own projects.

Photon-pump [https://github.com/madedotcom/photon-pump] is a client for Event Store
[https://eventstore.org/] we developed at made.com [https://made.com], it's the little
brother to atomic puppy [https://github.com/madedotcom/atomicpuppy] (which is another
eventstore client), it's async first, works using TCP so it's also faster (atomicpuppy
uses HTTP).

I won't talk about eventsourcing since it's been talked about on previous posts, so this
will be just a very simple and silly example of event sourcing.

So, let's say we have a game, for a game to happen we need players, so we need to create
them. So we're going to pretend that we have an application that creates players, which
will later, create an event and place it in the appropriate stream of Event Store.

This is the example of the "player created" event, it's a json blob:

{"name": "Gil"}

Now, we also need to pick a stream which is just a string representing the "bucket"
where the event will be put, we'll use "adventure" which is the name of our imaginary
game, not very creative, but it's better than "game".

An event will also have a type, which is like a sub category inside the stream. This is
how the event is looking like:

Event( stream="adventure", type="player_created", data=json.dumps({"name": "Gil"}) )

So how would we add this event into Event Store using Photon-pump in a single python
script?

```python
# writer.py

import asyncio

import photonpump

async def write_event(conn):
    await conn.publish_event(
        'adventure',
        'player_created',
        body={'name': 'Gil'}
    )

async def run():
    async with photonpump.connect('localhost') as conn:
        await write_event(conn)

if **name** == '**main**':
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(run())
```

So, line by line, we have an async function called write_event which will as the name
states, write the event into Event Store, using a Photon-pump connection passed in the
argument.

Next, we have the run function which will simply create the connection and pass it to
write_event.

finally, the ugly if \_\_name... to both create the event_loop, and run it
synchronously.

Now if you have your Event Store running locally (if you don't change it in the script),
go to this url: http://localhost:2113/web/index.html#/streams/adventure and you should
see the new event there.

Now that we have an event there, let's move on to the second part: reading the events
from python, and doing something with them. For this post, we'll just stick with a
simple print.

Since we wrote the event in the adventure stream, we want to read the events from that
stream in a separate script.

Here is all the code we need:

```python
#reader.py

import asyncio
import photonpump

async def read_an_event(conn):
    for event_record in await conn.get('adventure'):
        print(event_record.event.type, event_record.event.json())

async def run():
    async with photonpump.connect('localhost') as conn:
        await read_an_event(conn)

if **name** == '**main**':
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(run())

```

Ignoring run and if \_\_name... the read_an_event function uses the method get from
Photon-pump to collect all the events using it like an iterator and printing each of the
events. We get event_records, and each contains the event, so we can print out the type
and the data.

This was just a very simple example that I came up with, but if you want to make it more
like the real world, how about trying to follow the previous posts about CQRS using
Photon-pump to store and read the events.

Stay tuned for the next part where we will talk about subscriptions.

BONUS: If you want to replicate this code, you will need python 3.6+ (Remember to
install Photon-pump pip install photon-pump) and docker or Event Store installed on your
machine. Simply start Event Store in docker (docker run -p 1113:1113 -p 2113:2113
eventstore/eventstore) and run those python scripts ( writer.py and reader.py) in
sequence to see it work.
