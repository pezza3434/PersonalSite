---
layout: post
title:  "Get rid of your ugly ternary conditions in react"
date:   2016-03-10 08:02:00
categories: personal
description: A look at an alternative to ternary conditions on reactJS.
---

<p class="lead">Having used React for over 6 months now, I feel like I’m at that point in the learning curve where I understand a lot of the intricacies and best practices. </p>

However, there’s still a trickle of gems that change the way I write my React code, so here’s one I thought I’d share.

How many times have you written ternary statements like this in your JSX code?

```javascript
{this.props.loading ? <LoadingBar> : ''}
```

You may or may not have known that you can also write the previous example like this:

```javascript
{this.props.loading && <LoadingBar>}
```

A small change yes, but anything that helps tidy up JSX is much appreciated. By doing this you get rid of your empty strings or NULL evaluations everywhere.

### How does it work?

This works because of the way that we can use 'AND' and 'OR' operators.

It’s likely that you’ve seen the following example before to set default values:

```javascript
const something = undefined;
const somethingElse = 'Alex Perry';

const a = something || somethingElse;

// a === 'Alex Perry' (True)
```

If something is a ‘truthy’ value then ‘a’ will evaluate to the value of something. Otherwise if it is ‘falsy’, then ‘somethingElse’ will be checked for a ‘truthy’ value – and if it is ‘truthy’ then ‘a’ will evaluate to the value of ‘somethingElse’.

&& operators work a slightly different way:

```javascript
const something = 'Dave Smith';
const somethingElse = 'Alex Perry';

const a = something && somethingElse;

// a === 'Alex Perry'
```

Even though the something variable is true, 'a' will still evaluate to the somethingElse variable on the right of the operators.

These examples are just two scenarios of how bitwise operators work. Here is a table of all the possible evaluations:

#### And operator

<table>
<tbody>
<tr style="background:#DFDFDF; text-align:center;">
<td>Statement A</td>
<td>Statement B</td>
<td>Will evaluate to</td>
</tr>
<tr style="background:#F2F2F2; text-align:center;">
<td>0</td>
<td>0</td>
<td>0</td>
</tr>
<tr style="background:#F2F2F2; text-align:center;">
<td>0</td>
<td>1</td>
<td>0</td>
</tr>
<tr style="background:#F2F2F2; text-align:center;">
<td>1</td>
<td>0</td>
<td>0</td>
</tr>
<tr style="background:#F2F2F2; text-align:center;">
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
</tbody></table>

#### OR operator

<table>
<tbody><tr style="background:#DFDFDF; text-align:center;">
<td>Statement A</td>
<td>Statement B</td>
<td>Will evaluate to</td>
</tr>
<tr style="background:#F2F2F2; text-align:center;">
<td>0</td>
<td>0</td>
<td>0</td>
</tr>
<tr style="background:#F2F2F2; text-align:center;">
<td>0</td>
<td>1</td>
<td>1</td>
</tr>
<tr style="background:#F2F2F2; text-align:center;">
<td>1</td>
<td>0</td>
<td>1</td>
</tr>
<tr style="background:#F2F2F2; text-align:center;">
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
</tbody></table>


I’d highly recommend having a play with the logic of these operators for a few minutes in your console. It’s super useful to have this logic embedded in your brain and you’ll find that you use it all the time.

Thanks for reading!
