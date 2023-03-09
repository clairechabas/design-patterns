/**
 * Strategy
 *
 * Strategy is a behavioral design pattern that lets you define a family
 * of algorithms, put each of them into a separate class, and make their
 * objects interchangeable.
 *
 * Example: a context in charge of returning the best route to take
 * depending on your transportation method (bike, public transports,
 * car, walk...). Those methods are the different strategies.
 *
 * Use
 * - when you want to use different variants of an algorithm within an
 * object and be able to switch from one algorithm to another at runtime;
 * - when you have a lot of similar classes that only differ in the way
 * they execute some behavior;
 * - to isolate the business logic of a class from the implementation details
 * of algorithms that may not be as important in the context of that logic;
 * - when your class has a massive conditional statement that switches between
 * different variants of the same algorithm.
 */

/**
 * The Context defines the interface of interest to clients.
 */
class Context {
  /**
   * @type {Strategy} The Context maintains a reference to one of the Strategy
   * objects. The Context does not know the concrete class of a strategy. It
   * should work with all strategies via the Strategy interface.
   */
  private strategy: Strategy;

  /**
   * Usually, the Context accepts a strategy through the constructor, but also
   * provides a setter to change it at runtime.
   */
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  /**
   * Usually, the Context allows replacing a Strategy object at runtime.
   */
  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  /**
   * The Context delegates some work to the Strategy object instead of
   * implementing multiple versions of the algorithm on its own.
   */
  public doSomething(): void {
    // ...
    console.log(
      "Context: Sorting data using a specific strategy (don't know which one will be used)"
    );
    const result = this.strategy.doAlgorithm(["a", "b", "c", "d", "e"]);
    console.log(result.join(","));
  }
}

/**
 * The Strategy interface declares operations common to all supported versions
 * of some algorithm.
 *
 * The Context uses this interface to call the algorithm defined by Concrete
 * Strategies.
 */
interface Strategy {
  doAlgorithm(data: string[]): string[];
}

/**
 * Concrete Strategies implement the algorithm while following the base Strategy
 * interface. The interface makes them interchangeable in the Context.
 */
class ConcreteStrategyOne implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}
class ConcreteStrategyTwo implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

/**
 * The client code picks a concrete strategy and passes it to the context. The
 * client should be aware of the differences between strategies in order to make
 * the right choice.
 */
let context = new Context(new ConcreteStrategyOne());
console.log("Client: Strategy is set to normal sorting.");
context.doSomething();

context.setStrategy(new ConcreteStrategyTwo());
console.log("Client: Strategy is set to reverse sorting.");
context.doSomething();
