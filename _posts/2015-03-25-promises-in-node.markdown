---
layout: post
title:  "Bluebird – Promises in NodeJS"
date:   2015-03-25 20:02:00
categories: node
description: Learn how promises work in nodeJS and how the Bluebird node module can help make asynchronous easy.
---

<p class="lead">Promises are a way of controlling flow in your asynchronous code. Promises help you maintain clean, readable and robust code.</p>

A way you may be used to handling asynchronous events is callbacks. For example:

```javascript
fs.readFile('directory/file-to-read', function(err, file){
	if (error){
		//handle error
	} else {
		//do something with the file
	}
});
```


You may have heard people say before that node can quickly become callback hell, and this is why. As a node developer you are constantly dealing with asynchronous code and therefore constantly dealing with callbacks.

This callback seems simple enough. But more often than not you will want to do something once the action has completed, and therefore add nested code within the callback. You can see how this quickly gets messy, for example:

```javascript
fs.readFile('directory/file-to-read', function(err, file){
	if (error){
		//handle error
	} else {
		//do something with the file
		fs.mkdir('directory/new-directory', function(err, file){
			if (error) {
				//handle error
			} else {
				//new directory has been made
				fs.writeFile('directory/new-directory/message.txt', function(err, file){
					if(error) {
						// handle error
					} else {
						// File successfully created
					}
				});
			}
		});
	}
});
```


In this example I want to asynchronously, read a file, create a new directory and then create a new file. You can see that this simple three stage task results in some ugly nested code – especially once you add the logic in between each stage.

### Why should we use promises in node?

Taking the example above, here’s how you would tackle that problem with promises:

```javascript
fs.readFileAsync('directory/file-to-read')
	.then(function(fileData){
		return fs.mkdirAsync('directory/new-directory');
	})
	.then(function(){
		return fs.writeFileAsync('directory/new-directory/message.txt');
	})
```


Promises provide us with a cleaner and more robust way of handling async code. Instead of using a callback, the initial function returns a promise which is ‘thenable’. ‘.then’ can be chained as many times as you like and each ‘.then’ provides you with the information returned from the previous ‘.then’. Anything returned from a ‘.then’ will itself be ‘thenable’. This will usually be another async call, like in my example.

Promises also easily enable you to separate out your code (you will want to do this a lot with your node application) into different files.

For example: 

```javascript
function readFileandMakeDirectory(){
	return fs.readFileAsync('directory/file-to-read')
		.then(function(fileData){
			return fs.mkdirAsync('directory/new-directory');
		});
}

//The following will execute once the file has been read and a new directory has been made
readFileandMakeDirectory()
	.then(function(){
		return fs.writeFileAsync('directory/new-directory/message.txt');
	})
```


	
You see that it’s easy to create functions that return a promise. This is exceptionally useful when you’re splitting your code into different files with module.exports. For example you may have a route that reads a file, grabs an excerpt of its content, and then responds with the file excerpt as json. You could use a function which returns a promise to split out your code into separate components: 

```javascript
//routes/index.js
var router = require('express').Router();
var getPost = require('../utils/getFileExcerpt')

router.get('/', function(){
	getPost.then(function(fileExcerpt){
		res.json({message: fileExcerpt});
	});
});

module.exports = router;

//utils/getFileExcerpt.js

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

module.exports = function getPost(){
	return fs.readFileAsync(file, 'utf8').then(function(content){
        return {
            excerpt: content.substr(0, 100)
        }
    });
}
```

The code above also clearly demonstrates that anything returned from within a ‘.then’ is itself ‘thenable. Thanks to promises, you’ve got clean code which will be easy to test.

### Handling Errors

Handling errors with promises is very easy indeed. When running through the ‘thenables’ if there is an exception at any point then Bluebird will look for the nearest .catch to pass the error to. You can chain .catch to your chain of then’s. For example, using a previous example:

```javascript
fs.readFileAsync('directory/file-to-read')
	.then(function(fileData){
		return fs.mkdirAsync('directory/new-directory');
	})
	.then(function(){
		return fs.writeFileAsync('directory/new-directory/message.txt');
	})
	.catch(function(error){
		//do something with the error and handle it
	});
```

	
You can use the catch to handle your error. 

### But the module I want to use does not return a promise

You will have noticed that in my examples above I used such methods as ‘fs.writeFileAsync’ and ‘fs.mkdirAsync’. If you check the node documentation you will see that these methods don’t actually exist. FS does not return promises.

Despite this, bluebird has the incredibly useful functionality of enabling you to ‘promisfy’ modules which do not return promises. For example, to promisfy the fs module, simply require bluebird and a promisified version of fs.

```javascript
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
```


### Create your own promise

Due to the fact that you can promisfy modules it is unlikely that you will have to create promises manually yourself very often. However, despite this, it is still useful to know how. Creating a new Promise provides you with the resolve and reject callback. Pass into each of these the appropriate information.

```javascript
//myPromise.js

var Promise = require('bluebird');

module.exports = function(){
	return new Promise(function(resolve, reject){
		tradiationCallbackBasedThing(function(error, data){
			if (err) {
				reject(err);
			} else {
				resolve(data)
			}
		});
	});
}
```


This is effectively what promisifyAll will do for you anyway. However, you can use this technique to make your own custom promises for whatever you desire.

### Testing Promises

When I’m testing my server side code, my framework of choice is mocha and chai. There’s a good chance you’re also using the same. Be aware that when testing asynchronous code you will need to tell mocha when the async has finished. Otherwise it will just continue to the next test and usually error at that point.

To do this, simply invoke the callback that mocha provides you with in the ‘it’ part of the test. Like so:

```javascript
it('should do something with some async code', function(done){
   readPost(__dirname + '/../fixtures/test-post.txt')
       .then(function(data){
           data.should.equal('some content inside the post');
           done();
       })
       .catch(done);
});
```

Promises are extremely useful and something that I would definitely recommend to take some time to look at when dealing with asynchronous code in node. 
For further reading, I would recommend heading over to the Bluebird API docs and seeing what else you can do with this brilliant promise library.

