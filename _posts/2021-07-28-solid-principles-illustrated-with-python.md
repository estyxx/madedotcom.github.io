# S.O.L.I.D. principles illustrated in Python


SOLID is an acronym created by Bob Martin and Michael Feathers that refers to 
five fundamental principles that help engineers write maintainable code.

Here are the principles illustrated with minimal and hopefully
straightforward examples.

## S: Single Responsibility principle SRP

"A module, class, function should have one and only one reason to change."

We say that they have "high cohesion" so that we can reuse them later on
without side effect.

For example, let us say we are dealing with an inventory management system
that is going to track the stock per product.

```python
class Product:
    def __init__(self, sku, stock, price, colour):
        self.sku = sku
        self.price = price
        self.colour = colour
        self.current_stock = stock

p = Product("Table", 100, 99, 'red')
```

Here, we can say that our class has one too many responsibility:
- describing the product (with the price and the colour)
- describing the stock level (with the stock)

We could split the stock management in a separate class whose responsibility
will be only to represent the stock level.

So we will have 2 classes with each their own responsibility:
- ProductDescription, representing the product and managing it
- ProductStock, representing the stock of the product and managing it

```python
class ProductDescription:
    def __init__(self, sku, price, colour):
        self.sku = sku
        self.price = price
        self.colour = colour

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
p = ProductDescription("Table", 99, 'red')
s = ProductStock(p.sku, 100)
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
systems can use to compare their own data in order to check discrepancies.

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

A dependency is an object that can be used (a service).
An injection is the passing of a dependency to a
dependent object (a client) that would use it.

Entities must depend on abstractions, not on concretions. It states that the
high level module must not depend on the low level module, but they should
depend on abstractions.

A "high level module" is something close to the human or the business as
opposed to the "low level module" that is close to the machine or the technical
architecture of the system. 

The "high level module" doesn't care about the technicality of how we store
and retrieve the `ProductDescription` from the system.

```python
import sqlite3

# our high level module, i.e. our domain model
class ProductDescription:
    def __init__(self, sku, price, colour):
        self.sku = sku
        self.price = price
        self.colour = colour


# our low level module 
class ConcreteProductDescriptionRepository:
    def __init__(self, cursor):
        self.cur = cursor

    def add(self, product_entity):
        self.cur.execute("INSERT INTO products VALUES (?, ?, ?)",
                         (product_entity.sku, product_entity.price, product_entity.colour))

    def get(self, sku):
        self.cur.execute("SELECT * FROM products WHERE sku=?", (sku,))
        return self.cur.fetchone()


class ConcreteProductDescriptionRepositoryManager:
    def _make_sure_tables_exist(self):
        # the low level module depends on the high level module
        # we could map the python class with the sql table
        self.cur.execute('''CREATE TABLE IF NOT EXISTS products 
                         (sku text, price real, colour text)''')

    def __enter__(self):
        self.con = sqlite3.connect('product.db')
        self.cur = self.con.cursor()
        self._make_sure_tables_exist()
        return ConcreteProductDescriptionRepository(self.cur)

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.con.commit()


with ConcreteProductDescriptionRepositoryManager() as crm:
    p = ProductDescription("Chair", 99, "red")
    print("Add product in database")
    crm.add(p)
    print("Delete object")
    del(p)
    print("Retrieve product from database")
    p = crm.get("Chair")
    print(p)

```

Notice that our entity, the `ProductDescription`, doesn't depend on the low
level module that implement the access and storage to the database.

It is the other way around, the low level object depends on the model.

We haven't introduce a python-class-to-sql-table-mapping here because it seems 
a bit cumbersome to do it with `sqlite3`. However, in our production code, we use
sqlalchemy that enables us to do that using the [classical mapping](https://docs.sqlalchemy.org/en/14/orm/mapping_styles.html#orm-imperative-mapping)

Here we are actually implementing a "Repository Pattern". Read more about this 
pattern in Harry and Bob's book: https://www.cosmicpython.com/book/chapter_02_repository.html

## _References_

1. https://www.infoq.com/presentations/solid-principles/
2. https://www.infoq.com/presentations/solid-javascript/?itm_source
3. =presentations_about_SOLID&itm_medium=link&itm_campaign=SOLID
4. https://www.slideshare.net/Kevlin/python-advanced-building-on-the-foundation/4-IntroductionEverything_has_a_beginning
5. https://www.youtube.com/watch?v=miGolgp9xq8 at 22:48
6. https://code.tutsplus.com/series/the-solid-principles--cms-634
7. https://hackernoon.com/interface-segregation-principle-bdf3f94f1d11
8. https://github.com/zedr/clean-code-python#liskov-substitution-principle-lsp
9. https://github.com/ryanmcdermott/clean-code-javascript#solid
10. https://www.slideshare.net/RubyMeditation/functional-objects-in-ruby-new-horizons-valentine-ostakh
11. https://sobolevn.me/2020/02/typed-functional-dependency-injection
12. https://www.researchgate.net/publication/323935872_SOLID_Python_SOLID_principles_applied_to_a_dynamic_programming_language
13. https://medium.com/@dorela/s-o-l-i-d-principles-explained-in-python-with-examples-3332520b90ff
14. https://github.com/heykarimoff/solid.python
15. https://programmingwithmosh.com/javascript/solid-5-principles-of-object-oriented-design-every-developer-must-learn/
16. http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod
17.https://adevait.com/software/solid-design-principles-the-guide-to-becoming-better-developers
18. https://www.youtube.com/watch?v=3BIRXTtFHoo
19. https://itnext.io/solid-principles-explanation-and-examples-715b975dcad4
20. https://www.planetgeek.ch/wp-content/uploads/2013/06/Clean-Code-V2.1.pdf
21. https://www.youtube.com/watch?v=pTB30aXS77U
22. https://blog.ploeh.dk/2013/12/03/layers-onions-ports-adapters-its-all-the-same/
23. https://en.wikipedia.org/wiki/Dependency_inversion_principle
24. https://www.cosmicpython.com/book/chapter_02_repository.html
25. https://docs.pytest.org/en/latest/fixture.html#fixtures-a-prime-example-of-dependency-injection
