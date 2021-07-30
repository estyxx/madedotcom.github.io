# S.O.L.I.D. principles illustrated in Python


SOLID is an acronym created by Bob Martin and Michael Feathers that refers to 
five fundamental principles that help engineers write maintainable code.

## S: Single Responsibility principle SRP

"A module, class, function should have one and only one reason to change."

We say that they have "high cohesion" so that we can reuse them later on
without side effect.

For example, let us say we are dealing with an inventory management system
that is going to track the stock per product.

```python
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

```python
# our original Product class becomes lighter
class Product:
    def __init__(self, sku):
        self.sku = sku

# new class
class ProductStock:
    def __init__(self, sku, stock):
        self.sku = sku
        self._stock = stock

    def add_stock(self, quantity):
        self._stock += quantity

    def remove_stock(self, quantity):
        self._stock -= quantity

    @property
    def stock(self):
        return self._stock

# same information will be:
p = Product("Table")
stock = ProductStock(p.sku, 100)
```

Notice that if we extrapolate, the classes are used for different business
purposes as well. One will ultimately be to manage the product catalog, that
could be used by the people focusing on the feature of the products
(designers for example). One will target the business user dealing with the
stock management such as the warehouse people.  

## O: Open Closed Principle OCP

Objects or entities should be open for extension but closed for modification.

This simply means that a class should be easily extensible without modifying the
class itself.

In the context of our inventory management system above, it is possible to
have products with "infinite" stock. These are for example the make to order
products (*MTO*) that we order only from our supplier when enough quantity
have been sold.  

How would we represent that without following the Open Closed Principle?

```python
Infinity = float("inf")  # new code
class ProductStock:
    def __init__(self, sku, stock, type):
        self.sku = sku
        self._stock = stock
        self.type = type  # new code

    def add_stock(self, quantity):
        self._stock += quantity

    def remove_stock(self, quantity):
        self._stock -= quantity

    @property
    def stock(self):
        if self.type == 'MTO':   # new code
            return Infinity  # new code
        else:  # new code
            return self._stock  # new code
```
So here you can see that our class gets modified but it shouldn't be open for
modification. We should only extend it.

To do that, I would rewrite the code with a base Abstract class.

And I will have 2 concrete classes for:
- the warehouse stock
- the MTO stock

But this also opens the possibility to have different types of stock if we have
different way of counting the stock for example.

```python
from abc import ABCMeta, abstractmethod

Infinity = float("inf")


class ProductStockAbstract(metaclass=ABCMeta):
    def __init__(self, sku, *args, **kwargs):
        self.sku = sku

    @abstractmethod
    def stock(self):
        pass


class WarehouseStock(ProductStockAbstract):
    def __init__(self, sku, stock):
        super().__init__(sku, stock)
        self._stock = stock

    def add_stock(self, quantity):
        self._stock += quantity

    def remove_stock(self, quantity):
        self._stock -= quantity

    @property
    def stock(self):
        return self._stock


class MTOStock(ProductStockAbstract):
    def __init__(self, sku):
        super().__init__(sku)

    @property
    def stock(self):
        return Infinity


normal_product = WarehouseStock("Chair-SKU-BLA", 10)
print('normal_product', normal_product.stock)

mto_product = MTOStock("Cushion-SKU-BLA")
print('mto_product', mto_product.stock)
```


## L: Liskov Substitution Principle LSP

Every subclass class should be substitutable for their parent class.

Here we are obeying the LSP but if the method `add_stock` and `remove_stock` 
were in the parent class, then we would be violating the principle since it
wouldn't make sense to have such methods for the `MTOStock` which has infinite
stock.


## I: Interface Segregation Principle ISP

A client should never be forced to implement a method that they do not use, or
clients shouldn't be forced to depend on methods they do not use.

Interfaces are just plain function name definitions. There is no implementation
of any kind of logic in them.

Let us imagine that we need to upload the stock level that we have computed
in our system to a shared files repository that external warehouse
systems can use to compare their own data to check discrepancies.

Where would we have that capability?

We are not going to extend the `WarehouseStock` class, that would be
violating the SRP and OCP principle. 

Adding it to the `ProductStockAbstract` would break the `LSP` because the 
`MTOStock` doesnt need to implement it.

A good way to do that in python is to use Composition so that we would pass
the service that implement sending these report as an attribute to the 
`WarehouseStock` class.

```python
from abc import ABCMeta, abstractmethod

Infinity = float("inf")


class ProductStockAbstract(metaclass=ABCMeta):
    def __init__(self, sku, *args, **kwargs):
        self.sku = sku

    @abstractmethod
    def stock(self):
        pass


class StockReportSender:
    def __init__(self):
        self.collections = {}

    def send(self):
        print("Sending")
        for sku, stock in self.collections.items():
            print(sku, stock)


class WarehouseStock(ProductStockAbstract):
    def __init__(self, sku, stock, sender=None):
        super().__init__(sku, stock)
        self._sender = sender
        self.stock = stock

    def add_stock(self, quantity):
        self._stock += quantity

    def remove_stock(self, quantity):
        self._stock -= quantity

    @property
    def stock(self):
        return self._stock

    @stock.setter
    def stock(self, stock):
        self._stock = stock
        if self._sender is not None:
            sender.collections[self.sku] = self._stock


sender = StockReportSender()
for product, qty in [("Chair-SKU-BLA", 10), ("Lamp-BLA", 10)]:
    WarehouseStock(product, qty, sender)
sender.send()

```

## D: Dependency Inversion Principle DIP

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
https://www.youtube.com/watch?v=pTB30aXS77U

