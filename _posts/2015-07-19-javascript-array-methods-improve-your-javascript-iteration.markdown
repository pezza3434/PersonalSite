---
layout: post
title:  "Array methods: Dramatically improve your javascript iteration"
date:   2015-06-08 19:02:00
categories: personal
description: Dramatically improve your javascript iteration by learning the map, reduce and filter javascript array methods.
---

<p class="lead">Every now and again, something comes along which significantly improves and changes the way you write javascript. </p> For me, one of these things was learning my iterative array methods properly.

### The problem

To how many of you is the following a common solution?

```javascript
var arrayToBuildUp = [];

for (var x = 0; x < someDataToIterateOver.length; x++) {
    //some logic to find somethings in the data you want
    arrayToBuildUp.push(theThingInTheDataYouWant);
}

// or something similar

someDataToIterateOver.forEach(function(){
    arrayToBuildUp.push(theThingInTheDataYouWant);
});
```

This way of iterating over an array can be dramatically improved with one of three array recommends which I would highly recommend that you learn.

There are two main problems with this way of building up a new array. 1) It’s more code than is necessary. The process of creating a new empty array and building it up with a separate loop will feel like a code smell once you learn your array methods. 2) It’s completely non descriptive. When someone else reads over that code, you have no instant way of knowing why they’re iterating over the array of what they are doing with it. This is more apparent when the iteration is complex.

So what are these array methods? I will try to provide simple examples.

Each of these methods return new arrays. **This is important**; they are not directly manipulating the original array.

In the following examples I will be using the following variable:

```javascript
var peope = [{
    name:'Dave',
    age:30
},{
    name:'Alex',
    age:42
},{
    name:'Ian',
    age:57
},{
    name:'John',
    age:16
},{
    name:'Martin',
    age:14
}];
```

### Array.Filter

Array.Filter accepts a callback as its argument. Within that callback you have access to the current iteration. You also have access to the iterations index and the entire array you are iteration on. You simply return true to keep the current iteration in the new array, or return false if you want to neglect it from the new array.

In this example you have an array of objects. Each object represents a person and you only want to be left with the people who are over 18.

```javascript
var peropleOver18 = people.filter(function(person){
    if(person.age < 18){
        return false;
    }
    return true;
});
```

Without using array methods, the alternative is this:

```javascript
var filteredPeople = [];

for(var x = 0; x < people.length; x++) {
    if (people[x].age < 18) {
        filteredPeople.push(people[x]);
    }
}
```

In terms of saving lines of code there’s not too much of a difference, however by using filter you are being much more clear on what you are going to do with the array. The other big advantage is that the loop itself returns the new array, you don’t have to define an empty array. This applies to all the array methods mentioned.
This advantage results in much cleaner code when you apply it to a real world scenario. In reality it is highly likely the iteration would be wrapped up in a function, along with other functions doing other things. For example:

```javascript
function findPeopleOver18(people) {

    var filteredPeople = [];

    for(var x = 0; x < people.length; x++) {
        if (people[x].age < 18) {
            filteredPeople.push(people[x]);
        }
    }

    return filteredPeople
}
```

Compare this to using the array method in a function:

```javascript
function findPeopleOver18(people) {
    return people.filter(function(person){
        if(person.age < 18){
            return false;
        }
        return true;
    });
}
```

**Therein lies a massive advantage**, you can simply return the iteration itself; this is because the iteration returns the new array.

### Array.Map

The map method is used when you want to alter the data in someway. This is different than filtering it. For example, we might decide that we don’t care about the ages of the people anymore and that we simply want an array of names, rather than the current array of objects.

```javascript
var newArr = people.map(function(person){
    return person.name;
});

//newArr = ["Dave", "Alex", "Ian", "John", "Martin"]
```

Array.map has a very similar signature to that of filter. It accepts a callback function that has access to the current iteration. You then return whatever you want the current iteration to become in the new array. This can be difficult at first to grasp your head around. In this second example, I decided that I actually want to keep each person as an object, and so you would do it like this:

```javascript
var newArr = people.map(function(person){
    return {name: person.name};
});

//newArr = [{name:'dave'},{name:'alex'},{name:'ian'},{name:'john'},{name:'martin'}]
```

### Array.Reduce

Array.reduce has a slightly different signature than the others in the way that it allows a callback with access to the current iteration, however it also requires an initial value for the new array. A lot of the time this will simply be an empty array or object. Through the process of the reduce, you then build up this initial value to be your new array. The callback also contains the previous value and the current value of your new array. The idea is that you keep adding to the 'previous value' (and consequently returning it), the result of which is then returned as the final array. This can be better explained in an example:

```javascript
var newArr = people.reduce(function(newArray, currentValue){
    //Upon first iteration...
    //newArray = []; This is because we set an empty array as the initial value
    //currentValue = {name:'dave', age:30}

    //We then need to return the current state of our new array.

    if (currentValue.age < 18) {
        return newArray; //If the age is under 18 then we return the array as it is.
    }

    newArray[index] = currentValue; //If they're over 18 then we add the person to the new array

    return newArray; //We then return the new state of the array

}, []);
```

On first glance, similar to map, reduce can be a difficult concept to wrap your head around. The important thing to remember is that you must always return the current state of your new array. If you don’t return something then it will break. However, once you’ve mastered it, the benefits are huge. As soon as someone sees reduce, they have a good idea what you’re doing with the array.

### Chaining

Now, if you’re feeling clever, you can chain these methods together. The reason you can do that is because each of these methods returns a new array, and therefore you can perform further array operations on it.

For example, you may want to reduce the array to only those who are over 18, but after this you don’t care about the age and you simply want an array of names. This is how you would go about doing it

```javascript
var peopleOver18 = people.reduce(function(newArray, currentValue, index){

    if (currentValue.age < 18) {
        return newArray;
    }

    newArray[index] = currentValue;

    return newArray;

}, []).map(function(person){
    return person.name;
});

//peopleOver18 = ["Dave", "Alex", "Ian"];
```

### A word of caution

Some of these methods may not be supported in older versions of IE. One of the reasons I got lazy with these myself not too long ago is because most of my time was spent coding an app which had to work all the way down to IE 7.

## TL;DR

Learn Array.map, Array.filter and Array.reduce and how to use them well. Then learn how to chain them. They will have a big impact on your javascript coding when iterating over arrays.
