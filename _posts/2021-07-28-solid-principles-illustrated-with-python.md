# S.O.L.I.D. principles illustrated in Python


SOLID is an acronym created by Bob Martin and Michael Feathers that refers to 
five fundamental principles that help engineers write maintainable code.

## S: Single Responsibility principle

"A module, class, function should have one and only one reason to change."

We say that they have "high cohesion" so that we can reuse them later on
without side effect.

For example, let us say we are dealing with an inventory management system
that is going to track the stock per product.

```
class Product:
    def __init__(self, sku, stock):
        self.sku = sku
        self.stock = stock

p = Product("Table", 100)
```

Here, we can say that our class has one too many reponsibility:
- describing the product
- describing the stock level

We could split the stock management in a separate class whose responsibility
will be only to represent the stock level.

So we will have 2 classes with each their own responsibility:
- Product, representing the product and managing it
- ProductStock, representing the stock of the product and managing it

```
# our original Product class becomes lighter
class Product:
    def __init__(self, sku):
        self.sku = sku

# new class
class ProductStock:
    def __init__(self, sku, stock):
        self.sku = sku
        self.stock = stock

    def add_stock(self, quantity):
        self.stock += quantity

    def remove_stock(self, quantity):
        self.stock -= quantity

# same information will be:
p = Product("Table")
stock = ProductStock(p.sku, 100)
```

Notice that if we extrapolate, the classes are used for different business
purposes as well. One will ultimately be to manage the product catalog, that
could be used by the people focusing on the feature of the products
(designers for example). One will target the business user dealing with the
stock management such as the warehouse people.  

## O: Open Closed Principle

Objects or entities should be open for extension but closed for modification.

This simply means that a class should be easily extensible without modifying the
class itself. Let's look at the AreaCalculator, especially its sum method.


```python
from math import pi


class AreaCalculator:
    def __init__(self, shapes):
        self.shapes = shapes

    def sum(self):
        areas = []
        for shape in self.shapes:
            if isinstance(shape, Circle):
                areas.append(pi * shape.radius ** 2)
            elif isinstance(shape, Square):
                areas.append(2 * shape.length)
        return areas

```

If we wanted the sum method to handle the computation of more shape's area, we
will need to modify the sum method here with more if/else blocks, and that
goes against the Open/Closed principle.


A way we can make that better is to remove the logic that compute the area of
each shape within each shape class.

For example for the Square class:


```python
class Square:
    # [...]
    def area(self):
        return self.length * 2
```

And the same for the Circle class:

```python
from math import pi

class Circle:
    def area(self):
        return pi * self.radius ** 2

```

Now to calculate the total sum of each shape, we would do, in the
AreaCalculator:

```python
class AreaCalculator:
    def sum(self):
        area = 0
        for shape in self.shapes:
            area += shape.area()
```


Now we can create an other shape class and pass it when calculating the sum
without breaking the code.

However, now an other problem arises, how do we know if the object passed in
the AreaCalculatot is actually a shape and has a area method?

Coding to an interface is an integral part of S.O.L.I.D., a quick example is
when we create an interface that every shape implements.


```python

class ShapeInterface:
    def area(self):
        raise NotImplemented


class Circle(ShapeInterface):
    def area(self):
        return pi * self.radius * 2
```

In our AreaCalculator, we can check that the objects passed are actually shape
instances.

```python
class AreaCalculator:
    def sum(self):
        area = 0
        for shape in self.shapes:
            if isinstance(shape, ShapeInterface):
                area += shape.area()
        return area
```


## L: Liskov Substitution Principle

Let q(x) be a property provable about object of x of type T. Then q(y) should
be provable objects y of type S where S is a subtype of T.

All this is stating that every subclass/derived class should be substitutable
for their base/parent class.

Still making use of our AreaCalculator class. Say we have a VolumeCalculator
class that extends the AreaCalculator class:

```python
class VolumeCalculator(AreaCalculator):
    def __init__(self, shapes):
        self.shapes = shapes

    def sum(self):
        result = 0
        # logic to compute the sum of the volume of the shapes
        return result
```

In the SumCaclulatorOutputter class we would have:

```python
import json


class SumCalculatorOutputter:

    def __init__(self, calculator):
        self.calculator = calculator

    def json_output(self):
        return json.dumps(self.calculator.sum())

    def html_ouput(self):
        return '<p>{self.calculator.sum()}</p>'
```


TODO!!!!!!!!!!!


## I: Interface Segregation Principle

A client should never be forced to implement a method that they do not use, or
clients shouldn't be forced to depend on methods they do not use.

A client should depend on the smallest set of interface features: the fewest
methods and attributes.

If a class has too many methods, the client is then bound to too many methods
it doesn't need.

Keeping focus on the needs of a collaborative class will tend to drive the unit
test cases.

If the features do not support the collaborative class they are more problem
than solution.

The Interface Segregation Principle is about business logic to client
communication.

Interfaces are just plain function name definitions. There is no implementation
of any kind of logic in them.

Correct abstraction is the key to ISP. To find correct abstraction, you should
explore your domain, probably build some semantic nets, come up with a set of
user stories, draw interaction diagrams... and all of that doesn't necessary
lead to good abstraction. Wrong abstraction are worst than no abstractions at
all. 

NB: an example of library for dependency injection we can use in python is `inject`
See:


## D: Dependency Inversion Principle

Entities must depend on abstractions, not on concretions. It states that the
high level module must not depend on the low level module, but they should
depend on abstractions.

https://blog.ploeh.dk/2013/12/03/layers-onions-ports-adapters-its-all-the-same/
https://en.wikipedia.org/wiki/Dependency_inversion_principle
https://www.cosmicpython.com/book/chapter_02_repository.html
https://docs.pytest.org/en/latest/fixture.html#fixtures-a-prime-example-of-dependency-injection



# References

https://www.infoq.com/presentations/solid-principles/
https://www.infoq.com/presentations/solid-javascript/?itm_source=presentations_about_SOLID&itm_medium=link&itm_campaign=SOLID
https://www.slideshare.net/Kevlin/python-advanced-building-on-the-foundation/4-IntroductionEverything_has_a_beginning
https://www.youtube.com/watch?v=miGolgp9xq8 at 22:48
https://code.tutsplus.com/series/the-solid-principles--cms-634
https://hackernoon.com/interface-segregation-principle-bdf3f94f1d11
https://github.com/zedr/clean-code-python#liskov-substitution-principle-lsp
https://github.com/ryanmcdermott/clean-code-javascript#solid
https://www.slideshare.net/RubyMeditation/functional-objects-in-ruby-new-horizons-valentine-ostakh
https://sobolevn.me/2020/02/typed-functional-dependency-injection
https://www.researchgate.net/publication/323935872_SOLID_Python_SOLID_principles_applied_to_a_dynamic_programming_language
https://medium.com/@dorela/s-o-l-i-d-principles-explained-in-python-with-examples-3332520b90ff
https://github.com/heykarimoff/solid.python
https://programmingwithmosh.com/javascript/solid-5-principles-of-object-oriented-design-every-developer-must-learn/
http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod
https://adevait.com/software/solid-design-principles-the-guide-to-becoming-better-developers
https://www.youtube.com/watch?v=3BIRXTtFHoo
https://itnext.io/solid-principles-explanation-and-examples-715b975dcad4
https://www.planetgeek.ch/wp-content/uploads/2013/06/Clean-Code-V2.1.pdf

# It looks like these patterns are influencing towards functional programing


