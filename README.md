Mockolate
========
Mockolate is a JavaScript mocking framework, because the other mocks don't have the right combination of rich flavor and velvety texture.

# Getting Started

`npm install i mockolate --save-dev`

# Usage

## 5 Second Tour
Mocking functions are incredibly simple with the mock function operation! First import mockFunction:

```js
//import syntax
import {mockFunction} from 'mockolate';

//require syntax
const mockFunction = require('mockolate').mockFunction;
```

Lets start by making things without callbacks:
```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};

//Now I tell it what I want it to do
ninja.getArsenal.when('ninja stars').thenReturn('100 crazy awesome ninja stars');

console.log(ninja.getArsenal('ninja stars'))
//Result '100 crazy awesome ninja stars'

console.log(ninja.getArsenal());
//Result undefined, since we didn't specify a when for no arguments
```

And the asynchronous version:
```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};

ninja.getArsenal.when().thenReturn('100 crazy awesome ninja stars');
ninja.getArsenal(function(err, weapons){
  console.log(weapons);
  //Result: '100 crazy awesome ninja stars' because we defined a when with no arguments
})
```

Thanks for taking the 5 second tour, you can find more documentation below!

## Synchronous Stubbing

### Return a value
```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};

//Now I tell it what I want it to do
ninja.getArsenal.when('ninja stars').thenReturn('100 crazy awesome ninja stars');

console.log(ninja.getArsenal('ninja stars'))
//Result '100 crazy awesome ninja stars'

console.log(ninja.getArsenal());
//Result undefined, since we didn't specify a when for no arguments
```

### Throw An error
```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};

//Now I tell it what I want it to do
ninja.getArsenal.when().thenThrow(new Error('No weapons!'));

try{
  ninja.getArsenal();
} catch (err){
  console.log(err.message);
  //Result 'No weapons!'
}
```

### throwError vs thenThrow
`when.throwError` and `when.thenThrow` do the same thing for synchronous functions.

## Asynchronous Stubbing

__Note:__ Mockolate assumes that you will be using the node conventions for asynchronous functions, meaning the last argument to the function should be the callback. It also assumes node style of invoking callback the the `callback(err, result)` convention;

### Return a value to the callback
```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};

//Now I tell it what I want it to do
ninja.getArsenal.when('ninja stars').thenReturn('100 crazy awesome ninja stars');

ninja.getArsenal('ninja stars', (err, message) => {
  console.log(message);
  //Result '100 crazy awesome ninja stars'
})

ninja.getArsenal((err, message) => {
  console.log(message);
  //Result is undefined, since we didn't specify a when for no arguments
})
```

### Return an error to the callback
```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};

//Now I tell it what I want it to do
ninja.getArsenal.when('ninja stars').thenError('100 crazy awesome ninja stars');

ninja.getArsenal('ninja stars', err => {
  console.log(err);
  //Result '100 crazy awesome ninja stars'
  //No error was thrown, the callback was invoked with one.
})
```

### Throw and error instead of invoking the callback
This is where `thenError` and `thenThrow` differ. When mocking async functions `thenError` will invoke the callback with an error parameter, but using `thenThrow` will cause the function to throw an error instead.

```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};

//Now I tell it what I want it to do
ninja.getArsenal.when('ninja stars').thenThrow('No ninja stars!');

try{
  ninja.getArsenal('ninja stars');
} catch (err){
  console.log(err.message);
  //Result 'No ninja stars!'
}
```

# Documentation

## Mock Function

### Called
Tracks the number of times the function has been called.

```js
const myFunc = mockFunction();
myFunc();
myFunc();
expect(myFunc.called).to.equal(true);
```

### When
The `when` method allows you to provide when/then pairings to tell the mock how you would like it to react. See the `when` section for additional details.


## When

The when object allows you to tell a mock how you would like it to act. Each when must be paired with a `then` telling it what you would like it to do.

### Basic Usage
When takes in any number of arguments you like, and will use the correspond `then` clause to act how you want it to when the mocked function is invoked with those arguments. Ok, seems complex, but it just hard to describe. Here it is in practice.

```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};

//When getArsenal is invoked with 'ninja stars' then it should return 'No ninja stars!'
ninja.getArsenal.when('ninja stars').thenReturn('No ninja stars!');
//When getArsenal is invoked with 'swords' then it should return '1 katana'
ninja.getArsenal.when('swords').thenReturn('1 katana');
//To stub out no arguments, just provide an empty when
ninja.getArsenal.when().thenReturn('1 katana and no ninja stars');
//You can get really fancy and chain when/thens together. Not that every when must have exactly one then clause
ninja.getArsenal.when('ninja stars').thenReturn('No ninja stars').when('sword').thenReturn('1 katana');
```

### Matching
A when is considered to have matched when the provided `when` conditions match the arguments provided in order. If there are more provided arguments then are given in the `when` condition it is still considered to be a match as long as all the `when` conditions are met. Example:

```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};
//Normal case
ninja.getArsenal.when('ninja stars').thenReturn('No ninja stars!');
console.log(ninja.getArsenal('ninja stars'));
//Result 'No ninja stars!'.

//Lets provide an argument we didn't give the when
console.log(ninja.getArsenal('swords'));
//Result is undefined, we didn't tell it what to do for swords

//If you've been reading the rest of the docs this is probably not a surprise. However:
console.log(ninja.getArsenal('ninja stars', 'balloons'));
//Result: 'No ninja stars!'
```
Since all when arguments were provided (i.e. `'ninja stars'`) it doesn't matter that we also pass in balloons. This is particularly useful if you are mocking asynchronous functions because you do not have to specify the callback but it will still match.

### Specificity
Whens match from most specific to least specific. That means if you give it a really general when like `when()` it will only match if no other whens match first.

```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};
ninja.getArsenal.when().thenReturn('1 star');
ninja.getArsenal.when('ninja stars').thenReturn('No ninja stars!');

console.log(ninja.getArsenal());
//Result is '1 stars' since it matches the no argument when.
console.log(ninja.getArsenal('ninja stars'));
//Result is 'No ninja stars' because when('ninja stars') is more specific than when().
```

__Note:__
If two whens have the exact same number of arguments (specificity) the order they will execute in is undefined. This should not generally be a problem because the more arguments you have the less likely that all the arguments will be exactly the same.


### Then Clauses
Each one has to have exactly one then clause which tells it what to do in that situation. `thenReturn` is the most commonly used, but you can find more information about each before.

#### thenReturn
Synchronous: returns the provided value
Asynchronous: invokes the callback with the provided value

```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};
ninja.getArsenal.when('ninja stars').thenReturn('No ninja stars!');

//Synchronous
console.log(ninja.getArsenal('ninja stars'));
//Result is 'No ninja stars!';

//Asynchronous
ninja.getArsenal('ninja stars', (err, result) => {
  expect(err).not.to.be.ok;
  expect(result).to.equal('No ninja stars!');
})
```

#### thenError
Synchronous: throws an provided error, or creates a new error with the provided message
Asynchronous: invokes the callback with the provided error value

`thenError` is different from `thenThrow` in that it will invoke a callback with the error instead of throwing it (if possible). `thenThrow` will always throw an error, even if a callback is provided.

```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};
ninja.getArsenal.when('ninja stars').thenError('No ninja stars!');

//Synchronous
try{
  ninja.getArsenal('ninja stars');
} catch (err){
  expect(err).to.be.ok;
  expect(err).to.be.instanceof(Error);
  expect(err.message).to.equal('No ninja stars!');
}

//Asynchronous
ninja.getArsenal('ninja stars', err => {
  expect(err).to.be.ok;
  expect(err).to.equal('No ninja stars!');
  //Note: when invoking callbacks it will not convert the message to an error.
})
```

#### thenThrow
Throws an error with the provided error or converts the provided message to an error. It always does this, wether a callback has been provided or not.

```js
//I want to mock the ninja getArsenal function
const ninja = {
  getArsenal: mockFunction()
};
ninja.getArsenal.when('ninja stars').thenError('No ninja stars!');

//Synchronous
try{
  ninja.getArsenal('ninja stars');
} catch (err){
  expect(err).to.be.ok;
  expect(err).to.be.instanceof(Error);
  expect(err.message).to.equal('No ninja stars!');
}

//Asynchronous
try{
  ninja.getArsenal('ninja stars', () => {});
} catch (err){
  //Does not matter that we provided a callback, it will not be invoked.
  expect(err).to.be.ok;
  expect(err).to.be.instanceof(Error);
  expect(err.message).to.equal('No ninja stars!');
}
```

# Roadmap

Upcoming features planned for Mockolate.

## Matchers
Will allow you to pass in generic matchers to `when` functions. Proposed example:

```js
ninja.getArsenal.when(matchers.regex(/ninja/))).theReturn('1 star');
```

## In order returns
Will allow you specify what should happen on repeated invocations with the same arguments. Currently no proposed example. The goal is to help mock the case where a function increments on each invocation.

## Mock Objects
Will provide a simple way to create a mock from an existing object. Proposed example:

```js
var ninja = {
  power: 1,
  name: 'Ryu',
  getArsenal: () => {},
  killBadGuys: () => {}
}

var mockedNinja = mock(ninja);
// mockedNinja.power === 1;
// mockedNinja.name === 'Ryu';
// mockedNinja.getArsenal => replaced with a mockFunction
// mockedNinja.killBadGuys => replaced with a mockFunction

```
