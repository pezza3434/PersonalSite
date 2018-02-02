---
layout: post
title:  "How to use Call, Apply and Bind"
date:   2016-04-03 08:02:00
categories: personal
description: A quick reminder on how these three functions work and the uses of each.
---

<p class="lead">Call, apply and bind. Three methods that as Javascript developers we feel like we should have a deep understanding of. </p>

However, in reality, I’ve found that I don’t use them all that often – and when I do, I have to spend a few minutes reminding myself about the intricacies of each.

What follows is a quick summary / cheat sheet of the three functions.

### Similarities

The one similarity between all of these functions is that their first argument is always the ‘this’ value, or context, that you want to give the function you are calling the method on.

### Call

Call is the simplest of them all. It is exactly the same as invoking a function as you would do normally, however the difference is that you also get to specify the functions context. Here’s an example:

```javascript
function sayHello(firstName, secondName) {
    console.log(`${this.sayHello()} ${firstName} ${secondName}`);
}

var context = {
    sayHello() {
        return 'Hello';
    }
}

const firstName = 'Alex';
const secondName = 'Perry';

sayHello.call(context, firstName, secondName); //Hello Alex Perry
```

When I use call, I’m almost always using it to convert the ‘arguments’ object to a normal array so that I can iterate over it for some reason. That looks like this:

```javascript
Array.prototype.slice.call(arguments)
```

[Heres a closer look as to why this works](http://stackoverflow.com/questions/960866/how-can-i-convert-the-arguments-object-to-an-array-in-javascript#answer-960870)

### Apply

Apply is exactly the same as call apart from the fact that you pass in the functions arguments as an array and not separately. Here is the same example as above, but instead using apply:

```javascript
function sayHello(firstName, secondName) {
    console.log(`${this.sayHello()} ${firstName} ${secondName}`);
}

var context = {
    sayHello() {
        return 'Hello';
    }
}

const firstName = 'Alex';
const secondName = 'Perry';

sayHello.apply(context, [firstName, secondName]); //Hello Alex Perry
```

In reality I almost never use this in production code and rarely see my colleagues use it. I don’t disagree that there are use cases for it – merely I don’t find myself using it very often.

### Bind

My favourite of them all.

The bind method enables you to pass arguments to a function **without invoking it**. Instead, it returns a new function with the arguments bound **preceding** any further arguments.

Lets take a look at an example:

```javascript
function sayHello(firstName, secondName, middleName) {
    console.log(`${this.sayHello()} ${firstName} ${middleName} ${secondName}`);
}

var context = {
    sayHello() {
        return 'Hello';
    }
}

const firstName = 'Alex';
const secondName = 'Perry';
const middleName = 'James';

const boundFunc = sayHello.bind(context, firstName, secondName);

boundFunc(middleName); //Hello Alex James Perry
```

This function is the one, by far, that I use the most. I was using it today (a more complicated exampled granted) by combining it with a reduce function to bring another source of data into the iteration. This can be really useful as it keeps your functions pure.

```javascript
const numbers = [1,2,3,4];
const letters = ['a,b,c,d'];

function iterator(letters, collection, number) {
    //Whereas in a normal reduce I would only have access to the
    //data being mapped over - by using bind, I now have access to
    //another source of data.
}

const iteratedData = numbers.reduce(iterator.bind(null, letters), []);
```

Using bind is also super useful with React.js. For example - you can use it to bind your click events to any further information they may need.

```javascript
<span className="account_uploads_stats__delete__button" onClick={this.props.deleteAction.bind(null, this.props.imageId)}>
    <i className="fa fa-trash"></i>
    Delete Image
</span>
```

Another useful example is when you’re passing functions down to child components. You can bind data to these functions so that the child components don’t have to worry about invoking the function with a particular piece of data. Here’s a basic example:

```javascript
imageIds.map((imageId) => {
    return <PictureOfPerson clickAction={this.props.personClickAction.bind(null, imageId)}/>
});

//Now - when PictureOfPerson invokes its click action it will already be aware of the imageId without explicity
//passing it in.
```

### Simple right!?

That pretty much sums up call, apply and bind - three functions with subtle but important differences. I hope that this serves as a good reference if you’re ever not sure – it will for me!
