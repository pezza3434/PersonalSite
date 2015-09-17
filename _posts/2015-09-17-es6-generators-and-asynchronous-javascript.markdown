---
layout: post
title:  "ES6 Generators and asynchronous javascript"
date:   2015-09-17 21:02:00
categories: javascript
description: How can es6 generators dramatically improve the way in which we write our javascript code.
---

<p class="lead">ES6 is a hot topic at the moment and for good reason.</p>

If you don’t know what ES6 is, it stands for ecmascript 6 and is the latest version of javascript. With this new version comes some fancy new features, one of which is generators.

Generators themselves have two main uses, the first being as iterators and the second being to dramatically improve the way we write asynchronous code. In this post, I will focus on the second point and give you an introduction on the basics of generators.

### ES6

The following examples all use ES6 code. Ensure that you're running your code in an ES6 compatible environment before trying any of the examples.

### What are generators  

Generators introduce functions that can be paused.

Let that soak in, it’s important! Think about functions that you write everyday at the moment, when you invoke them they run until they reach the end of the function or until the function returns.

Generators play a twist on this. They enable you to pause and continue the function on will. Sounds good right?

### Some new syntax

Lets have a look at what a generator looks like:

```javascript
function *myGenerator() {
    yield 'hi';
    yield 'bye';
}
```

What’s new? The first thing to notice is the star by the function name. This simply states that this is a generator. The other new syntax is the yield keyword. The yield keyword tells the generator to pause when it gets to this point. This keyword will be explained further as we continue.

### Using generators

When you invoke a function, the function runs. Generators differ. **When you invoke a generator you receive an object** that has a next method. This next method must be called to begin the generator.

```javascript
function *sayHiAndBye() {
    yield 'hi';
    yield 'bye';
}

var myGenerator = sayHiAndBye();

myGenerator.next(); //{value: 'hi', done: 'false'}
myGenerator.next(); //{value: 'bye', done: 'false'}
myGenerator.next() // {value:'undefined', done: 'true'}
```

In this example you can see that I assign the generator object to a variable which I later call next on.

Every time you call next on a generator you receive a further object with two keys, value and done. **The expression or statement following the yield will become the value of this value key**.  The done key simply represents whether or not the generator has finished running. In this example, I don’t return anything from the generator and so the final object has a value of undefined. However, if you were to return something, value would equal whatever you returned.

### Communicating with generators

We can also pass values into next.

```javascript
function *sayFullName() {
    var firstName = yield 'first name';
    var secondName = yield 'second name';
    console.log(firstName + secondName);
}

var myGenerator = sayHiAndBye();

myGenerator.next(); //{value: 'first name', done: 'false'}
myGenerator.next('alex '); //{value: 'second name', done: 'false'}
myGenerator.next('perry') // {value:'undefined', done: 'true'}

//alex perry
```

How the values we pass into next are assigned is definitely a little confusing. The first time we call next, the generator yields the ‘first name’ string and pauses. The second time we call next we tell the generator to continue but we also pass in a value. This value will be assigned to the first name variable because we said in the generator that firstname equals whatever value is yielded at this point. Imagine that ‘yield ‘first name’’ returns whatever value is passed into the next.

The third time we call next we then pass in a value of perry. We will then see in our console the words ‘alex perry’.

![Generators meme](/images/posts/generators/meme1.jpg "Generators meme")

You may now be thinking that this is all well and good but what’s the point?

![Generators meme](/images/posts/generators/meme2.jpg "Generators meme")

The point is, in Javascript we absolutely love asynchronous behavior. Why is async so good? It’s good because it enables us to do all sorts of things without blocking the thread.

To demonstrate how generators and asynchronous code can work well together, lets take a look at this example:

```javascript
function getFirstName() {
    setTimeout(function(){
        gen.next('alex')
    }, 1000);
}

function getSecondName() {
    setTimeout(function(){
        gen.next('perry')
    }, 1000);
}


function *sayHello() {
    var a = yield getFirstName();
    var b = yield getSecondName();
    console.log(a, b); //alex perry
}

var gen = sayHello();

gen.next();
```

Lets have a look what’s going on step by step:

**1)**	The gen variable is created and assigned to the generator object.

**2)**	next() is called on the gen variable which tells the generator to begin.

**3)**	The generator then gets to its first yield where getFirstName() is invoked. What happens now is simple but brilliant. getFirstName() is a asynchronous operation due to its use of setTimeout. However, because next is only called once the setTimeout has finished we can guarantee that var a will be correctly assigned on the next line

**4)**	The same happens again with getSecondName().

**5)**	Once gen.next() has been called in getSecondName, ‘alex perry’ is logged out to the console.

### Generators enable us to write asynchronous code in a synchronous manner.

To clarify, if we were not using yield here, var a and var b would simply equal undefined because the function itself would return undefined. The function would not automatically know to only return once the setTimeout has finished.

What happens above is really important, have a read over it a couple of times or test it out yourself if some of it doesn’t make any sense.

### Promises

The real beauty of using generators for your asynchronous tasks comes from when we combine them with promises. If you don’t know what promises are, I would highly suggest looking at this [previous article](http://alexperry.io/node/2015/03/25/promises-in-node.html) of mine before continuing.

As a recap, promises represent a future value of which can be accessed with the .then() method. This is infinitely better than using callbacks because we get rid of all the horrible nesting resulting in simpler, more readable code.

### Combining generators and promises

Lets take a look at some real code. Here is some **production** code using promises that we have in the Laterooms.com code base:  

```javascript
return data.booking(req).then(function (confirmationResult) {

    confirmation = confirmationResult;

    if (!req.moonstick.hotelID) {
        req.moonstick.hotelID = confirmation.HotelId;
    }

    return data.hotelDetails(req).then(function (hotel) {
        //Does somethings with 'hotel'
    });
});
```

There are ways that we could remove the nesting here with more complicated uses of promises, however even that wouldn’t match the simplicity of using generators in this example.

```javascript
return Promise.coroutine(function*(){

    var confirmation = yield data.booking(req);

    if (!req.moonstick.hotelID) {
        req.moonstick.hotelID = confirmation.HotelId;
    }

    var hotelDetails = yield data.hotelDetails(req);

    return {hotelDetails: hotelDetails, confirmation: confirmation};
})().then((dataReturnedFromGenerator) => {
    //does some things with dataReturnedFromGenerator
});
```

The first thing to notice here is the use of promise.coroutine. Coroutine takes a generator as it’s argument.  This is part of the bluebird promise library; I believe that most other promise libraries have something similar. What promise.coroutine does is ensure that when there is a yield keyword the generator is paused until the promise has returned its value.

**The yield keyword itself does not understand promises.** The coroutine method wraps the generator similar to the previous example where we were calling next in setTimeout. This method is doing something very similar, but instead, calling next inside of the promises.

**Promise.coroutine returns a function that when invoked returns a promise which we can then call .then() on to get the data from the generator.**

What you will clearly notice is that even though we’re dealing with asynchronous promises, the code is clearly very synchronous looking. No need for any nesting.

The data that is returned from the generator becomes available in the following .then() method. So in this case, I simply return an object with the information I need.

Lets have a look at another Laterooms example:

```javascript
return Promise.props({
        rates: (someCondition) ? undefined : data.rates(req)
        .then(utils.findCheapestDouble)
        .then(function (ratesData) {
            return groupRates(ratesData, req, config, viewModel);
        }),
        hotelDetails: (someCondition) ? data.hotelDetails(req) : undefined
    })
    .bind(this)
    .then(function createViewModel(apiData) {

        //do some cool stuff with the data

    });
```

In this example we are using a more complicated bluebird method promise.props which enables us to group promises into one object.

The code is particularly complicated. We are in essence saying that rates is equal to the result of a long chain of promises if ‘someCondition’ is false. Hotel details is then the result of data.hotelDetails which itself is a promise.

Don’t worry too much if you don’t understand this code, what’s important to that you understand how much simpler this can become.

Lets write this in a synchronous way with generators:

```javascript
return Promise.coroutine(function* () {
    var rates = (someCondition) ? undefined : yield data.rates(req);
    //Notice here how rates can just be passed into findCheapestDouble()
    var cheapestDouble = utils.findCheapestDouble(rates);
    var groupedRatesData = groupRates(cheapestDouble, req, config, viewModel);
    var hotelDetails = (someCondition) ? yield data.hotelDetails(req) : undefined;
    //All nesting has been removed
    return {
        rates: groupedRatesData,
        hotelDetails: hotelDetails
    };
})().then((apiData) => {
    //do some cool stuff with the data
});
```

I hope that you can see the difference instantly. No more lengthy chaining of .then() methods; clear, readable, synchronous looking code with the yield keyword.

### A final example

```javascript
models.ratings.findAll({
            where: {
                user_rating_id: req.decoded.userId
            }
        }).then(function (ratings) {
            models.images.findAll({
                where: {
                    user_id: req.decoded.userId
                }
            }).then(function (images) {
                var profilePicture;
                if (!images.length) {
                    profilePicture = '/placeholder.png'
                } else {
                    profilePicture = images[0].dataValues.path
                }
                res.json({
                    username: req.decoded.username,
                    votes: ratings.length,
                    profilePicture: profilePicture
                });
            })
```

The first thing I did was identify where the promises were and then extracted these into their own methods that returned these promises.

Then, using generators the result is something like this:

```javascript
function getRatings() {
            return models.ratings.findAll({
                where: {
                    user_rating_id: req.decoded.userId
                }
            });
        }

        function getImages() {
            return models.images.findAll({
                where: {
                    user_id: req.decoded.userId
                }
            });
        }

        function getProfilePicture(images) {
            if (!images.length) {
                return '/placeholder.png';
            } else {
                return images[0].dataValues.path;
            }
        }

        Promise.coroutine(function*(){
            var ratings = yield getRatings();
            var images = yield getImages();
            var profilePicture = getProfilePicture(images);
            res.json({
                username: req.decoded.username,
                votes: ratings.length,
                profilePicture: profilePicture
            });
        })();
```

Instead of the nesting, I’m simply able to pass images into getProfilePicture() as if it was a string or a number, something that was synchronous.

![Generators meme](/images/posts/generators/meme3.jpg "Generators meme")

I hope that by now the advantages of generators are as clear as day. I’ve started to refactor some of the code in my personal projects and seen some real advantages to the simplicity and readability of the code.

### A note:

I am yet to performance test generators in relation to using pure promises however this is definitely something on my todo list. It is suggested here that generators are not optimised by V8 which could have an impact.

## TL;DR
1)	Generators can dramatically improve the way we write asynchronous code.
2)	Generators can make asynchronous code much simpler.
3)	Generators are sure to grow in popularity as the use of es6 increases.
