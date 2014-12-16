---
layout: post
title:  "AngularJS - Formatters and Parsers"
date:   2014-12-10 11:02:00
categories: angularjs
description: Learn how Formatters and Parsers work in AngularJS. A useful tool when dealing with information coming from and going to the model.
---

<p class="lead">Parsers and Formatters are a hidden gem within Angular and were something that I was definitely impressed with when I first stumbled upon them.</p>

###What are they?

As web developers we are dealing more and more with service orientated architecture. JSON, for example, is sent to the client side and it is from there that Angular takes over. However, there will be times when you want to change the way that data appears for the user without it being changed on the model – and there will also be times when you want to format how data is saved to the model, despite how it is entered in the view. Parsers and formatters for perfect for this.

Both parsers and formatters are used in directives and can be accessed within the link method of a directive that requires ‘ngModel.

Here is the basic format in which you may choose to a use a parser and a formatter:

<script src="https://gist.github.com/pezza3434/7b9f840e905c673a24f2.js?file=directive.js"></script>

###Parsers

Parsers change how view values will be saved to the model.

Lets create a simple input box to demonstrate this:

<script src="https://gist.github.com/pezza3434/7b9f840e905c673a24f2.js?file=markup.html"></script>

This simply displays an input box bound to some_letters.value and outputs the model below.

Every time you type a letter in that modal it will fire your parsers. Parsers receive the value of the input typed by the user and return the value for the model. For example:

<script src="https://gist.github.com/pezza3434/7b9f840e905c673a24f2.js?file=a-simple-parser.js"></script>

This parser takes the input for the user, converts it to upper case, and then returns it to the model. In the example you will see that even though you are typing in lower case letters, the model value equals the equivalent upper case. Feel free to do any logic that you like in here, simply return the value that you want on your model.

Here’s a real life, useful example of a parser. It prevents the user from typing a value more than 5 characters long into the modal:

<script src="https://gist.github.com/pezza3434/7b9f840e905c673a24f2.js?file=more-complex-parser.js"></script>

The $setViewValue() and $render() methods prevent the user from seeing any more values past 5 characters or numbers typed into the input. Without these, although the modal will remain unchanged the view value can continue to be edited.

Using $setViewValue() and $render will trigger the parser a second time. Keeping this in mind, it is important that you make sure you do not create an infinite loop. To prevent this, I store the last known ‘good’ value and display that in the view when the number of characters exceeds five.

Your parsers will get fired every time the UI representation of the model changes.

###Formatters

Formatters work in the opposite way that Parsers do. Formatters deal with data coming up from the model into the view. They will get called whenever the model changes and has to be rendered. They will also be called on the initial load of the page.

As an example, I’ll set some data in my controller:

<script src="https://gist.github.com/pezza3434/7b9f840e905c673a24f2.js?file=controller.js"></script>

And also set up my formatter:

<script src="https://gist.github.com/pezza3434/7b9f840e905c673a24f2.js?file=simple-formatter.js"></script>

You will now see that when you load the input that the containing text will all be upper case.

Formatters will NOT be called when the model is changed in the view. For example, you can continue to type lower case letters into the input and your formatters will not be called. Formatters are only called when the model changes in code. This is a point that caused me some confusion for a while.

For example, we could create a button which changes the value of ‘some_letters’ on the controller:

<script src="https://gist.github.com/pezza3434/7b9f840e905c673a24f2.js?file=controller-function.js"></script>

When ‘change_model’ is called, ‘dave’ will appear within the input in capital letters.

##TL;DR

Parsers are used when changing the value of the model but not necessarily in the view. Formatters are used when the value in the model changes and you want to change its display in the view.


