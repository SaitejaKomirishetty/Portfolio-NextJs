---
title: 'Prototypes vs. Classes: The Real Story ⛓️'
date: '2025-11-25'
excerpt: A beginner-friendly guide to JavaScript's prototypal inheritance. Learn how ES6 classes are syntactic sugar over constructor functions and prototypes, with side-by-side comparisons and real examples.
tags: ['web-dev', 'JS', 'Java script', 'webDevelopment', 'javascript']
featured: false
image: '/blog-media/prototypes_vs_classes.png'
---

If you've been learning JavaScript, you've probably encountered both `class` syntax and heard whispers about something called "prototypes." Maybe you're wondering: _Are these two different ways to do the same thing? Which one should I use?_

Here's the truth that might surprise you: **JavaScript's `class` keyword is actually syntactic sugar over its core prototypal inheritance system.** In other words, classes in JavaScript aren't a new feature—they're a more familiar-looking way to write the prototype-based code that JavaScript has always used under the hood.

Let's demystify this relationship and see what's really going on! 🔍

---

## What is Prototypal Inheritance?

JavaScript is fundamentally a **prototype-based language**. Unlike class-based languages like Java or C++, JavaScript objects can inherit properties and methods directly from other objects through a mechanism called the **prototype chain**.

Every JavaScript object has an internal link to another object called its **prototype**. When you try to access a property on an object, JavaScript first looks at the object itself. If it doesn't find the property there, it looks at the object's prototype, then the prototype's prototype, and so on up the chain.

---

## The Old Way: Constructor Functions + Prototypes

Before ES6 introduced the `class` keyword in 2015, JavaScript developers created object blueprints using **constructor functions** and **prototypes**. Here's how it works:

```javascript
// Constructor function (note the capital letter convention)
function Animal(name, species) {
    this.name = name;
    this.species = species;
}

// Adding methods to the prototype
Animal.prototype.makeSound = function () {
    return `${this.name} makes a sound!`;
};

Animal.prototype.describe = function () {
    return `${this.name} is a ${this.species}.`;
};

// Creating instances
const dog = new Animal('Buddy', 'Dog');
const cat = new Animal('Whiskers', 'Cat');

console.log(dog.makeSound()); // "Buddy makes a sound!"
console.log(cat.describe()); // "Whiskers is a Cat."
```

### What's Happening Here?

1. **Constructor Function**: `Animal` is a regular function, but when called with `new`, it creates a new object and sets `this` to refer to that object.
2. **Prototype Methods**: Instead of defining methods inside the constructor (which would create a new copy for each instance), we add them to `Animal.prototype`. All instances share these methods.
3. **The `new` Keyword**: When we use `new Animal(...)`, JavaScript creates a new object and links its prototype to `Animal.prototype`.

---

## The New Way: ES6 Classes

Now let's see the same functionality using the modern `class` syntax:

```javascript
// Class declaration
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }

    makeSound() {
        return `${this.name} makes a sound!`;
    }

    describe() {
        return `${this.name} is a ${this.species}.`;
    }
}

// Creating instances (exactly the same!)
const dog = new Animal('Buddy', 'Dog');
const cat = new Animal('Whiskers', 'Cat');

console.log(dog.makeSound()); // "Buddy makes a sound!"
console.log(cat.describe()); // "Whiskers is a Cat."
```

### What's Different?

The `class` syntax looks cleaner and more familiar to developers from other languages, but **it's doing the exact same thing under the hood!** The methods are still added to `Animal.prototype`, and instances are still created with the `new` keyword.

---

## Side-by-Side Comparison

Let's see both approaches together to really highlight the similarities:

### Constructor Function Approach

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
};

Person.prototype.greet = function () {
    return `Hello, I'm ${this.getFullName()}!`;
};

const john = new Person('John', 'Doe');
console.log(john.greet()); // "Hello, I'm John Doe!"
```

### Class Syntax Approach

```javascript
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    greet() {
        return `Hello, I'm ${this.getFullName()}!`;
    }
}

const john = new Person('John', 'Doe');
console.log(john.greet()); // "Hello, I'm John Doe!"
```

### They're Identical Under the Hood!

You can verify this yourself:

```javascript
// Both create the same prototype structure
console.log(typeof Person); // "function"
console.log(john instanceof Person); // true
console.log(john.constructor === Person); // true
console.log(Person.prototype.greet); // [Function: greet]
console.log(john.__proto__ === Person.prototype); // true
```

---

## Why Use Class Syntax Then?

If classes are just syntactic sugar, why use them? Here are some good reasons:

### 1. **Cleaner, More Readable Code**

The class syntax groups related code together and is easier to read, especially for developers coming from other languages.

### 2. **Inheritance is Simpler**

```javascript
// With constructor functions
function Dog(name) {
    Animal.call(this, name, 'Dog');
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// With classes
class Dog extends Animal {
    constructor(name) {
        super(name, 'Dog');
    }
}
```

### 3. **Less Error-Prone**

Classes enforce certain best practices (like requiring `new` to be used) that constructor functions don't.

---

## Important Things to Remember

1. **JavaScript is Still Prototype-Based**: The `class` keyword doesn't change JavaScript's fundamental nature. It's still using prototypes behind the scenes.

2. **Classes Are Functions**: In JavaScript, a class is actually a special kind of function:

    ```javascript
    class MyClass {}
    console.log(typeof MyClass); // "function"
    ```

3. **You Can Mix Approaches**: Since they're the same under the hood, you can even mix both styles (though it's not recommended for clarity):

    ```javascript
    class Animal {
        constructor(name) {
            this.name = name;
        }
    }

    // Adding a method the "old way" still works!
    Animal.prototype.newMethod = function () {
        return 'This works!';
    };
    ```

4. **Performance is the Same**: Because they compile to the same thing, there's no performance difference between the two approaches.

---

## Key Takeaways

-   JavaScript's `class` syntax is **syntactic sugar** over its prototype-based inheritance system
-   Constructor functions with prototypes and ES6 classes produce the **exact same result**
-   Classes make code **cleaner and more readable**, especially for complex inheritance
-   Understanding prototypes helps you understand **what's really happening** when you use classes
-   Modern JavaScript projects typically use **class syntax**, but understanding prototypes is crucial for:
    -   Debugging
    -   Reading older code
    -   Understanding JavaScript deeply

---

## Conclusion

Now you know the secret: when you write a JavaScript class, you're still using prototypes! The `class` keyword is like a more elegant outfit for the same underlying system. Think of it as JavaScript giving developers a syntax that looks familiar while keeping its prototype-based heart.

Which should you use? For new code, **go with classes**—they're cleaner and less error-prone. But understanding prototypes will make you a better JavaScript developer, because you'll know what's really happening when your code runs.

Happy coding! 🚀

---

_Want to explore more? Try opening your browser's developer console and experimenting with `Object.getPrototypeOf()` and `__proto__` to explore the prototype chain yourself!_
