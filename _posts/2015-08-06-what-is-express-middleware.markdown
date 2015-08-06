---
layout: post
title:  "What is express middleware?"
date:   2015-08-06 20:02:00
categories: javascript
description: A complete guide to all the basics and everything you need to know about express middleware.
---

<p class="lead">When I first made the move to node, one of the first things that I struggled to get my head around was the concept of middleware. </p> Before node my only experience with server side coding was PHP; I’ve used both Codeigniter and Laravel and I cant think of anything similar in these frameworks. Today, I hope to leave you with a clear understanding of what exactly middleware is.

### What is middleware

Fundamental to Node.js and express is middleware. You will use middleware all the time in express and a lot of your logic will live inside of them. Middleware has a strict signature:

```javascript
module.exports = function (req, res, next) {

};
```

Middleware is invoked with a request, a response and next.

Request is the request object. It contains really important things like the request headers and the request body (presuming your using bodyparser).

The response is the express response method. You use this to send responses back to the client, for example res.json({‘message’:’hello there’});

Next is something unique to express. You invoke next when you are done in your middleware and you want to move on to the next piece of middleware.

**It is hugely important that you either respond to the request or call next in every piece of middleware. If you don’t, the app will simply hang.** This still gets me all the time.

Also, javascript rules still apply. If you call next early on in your middleware and don’t return it then express will evaluate the rest of the middleware before it moves on – and this can have unnecessary side effects. Lets look at a real world example:

```javascript
module.exports = function (req, res, next) {

    var token = req.headers['x-authentication-token'];

    if (!token || !isTokenValid(token)) {
        return next();
        // If we dont return next then res.json will be evaluated
        // and express will throw an error.
    }

    res.json({message: 'Your token is valid and you are authenticated'});

};
```

Hopefully now you get a good idea of the structure of middleware.

### How to use middleware in your app

As you saw in my example, it is good practice to put each piece of middleware in its own file and expose it with module.exports. You can then use this middleware in one of two ways:

**1)** Add it to every request in your app. For example in your main app.js file you might have something like:

```javascript
var myMiddleware = require('../myMiddlware');

app.use(myMiddleware);
```

You pass your middleware into app.use() uninvoked. Express will then invoke it with req,res and next as described previously.

**2)** You can also use middleware exclusively on your routes. For example:

```javascript
//authenticateRoute is your router.method route

var myMiddleware = require('../myMiddlware');

app.use('/authenticate', myMiddleware, authenticateRoute);
```

This is extremely useful. In this example, the middleware will only get invoked if the user is sending a request to your app via /authenticate. For example, you might want some middleware to check that the user is sending a request with the correct authorization header but you don’t care about that if they are sending a request via the ‘/burgers’ route.

### Order is important

Think of the request as something that starts at the top of your app and flows all the way through your app. While doing this it flows through your middleware and your routes until something somewhere calls res or throws an error.

**Therefore, if one middleware relies on something being set in another, it is important that it is used afterward.**

Here is a very simple example:

```javascript
var bodyParser = require('body-parser');

app.use('/authenticate', authenticate);
//The authenticate route is now broken. It relies on
//things in req that body parsers sets. As req flows through
//the route before it does bodyParser, authenticate now cannot
//access the information it needs to

app.use(bodyParser);
```

That’s just about everything you need to know to get started with middleware. Now go forth and write a node app!

## TL;DR
1)	Middleware is fundamental to any express app
2)	Remember to call either next or res in every piece of middleware
3)	The order of your middleware is super important
