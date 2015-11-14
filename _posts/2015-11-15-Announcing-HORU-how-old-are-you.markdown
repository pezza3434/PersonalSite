---
layout: post
title:  "HORU - How old are you?"
date:   2015-11-15 09:02:00
categories: javascript
description: Announcing HORU - The platform for finding out how old you really look.
---
[![Horu Logo](/images/posts/horu/horu.jpg "Horu Image")](http://horu.io)

<p class="lead">Over the past few months I’ve been working on a project called. HORU stands for, ‘how old are you’.</p>

Here is a small interview with myself about [HORU](http://horu.io):

---

### What is HORU?

HORU is a platform where you can truly find out how old other people think you look.

### How does it work?

In a nutshell, users upload pictures of themselves and other users see these pictures and vote on how old they think that person looks. Therefore, there are actually two elements to HORU, the game like element of seeing how good you are at guessing peoples ages, but also the fact that this provides real value by providing someone with an age of how old other people think they look.

### Did anything inspire HORU?

Yes. I originally got the idea when Microsoft released [https://how-old.net/](https://how-old.net/). Tons of people at home and in the office were using it to see how old the computer thought that they looked. This was good but there was one huge problem….it turns out (at the moment anyway) computers aren’t incredibly accurate at guessing our ages. The ages returned from the app were often completely wrong.

Despite this, the how-old app went viral, as it stands it currently has around 2.3m shares on Facebook and has been tweeted about 150 thousand times. I realized at this point that people are genuinely interested in finding out how old they look.

After thinking about how people could find out how old they actually look, I could only think of one way. You need to ask lots and lots of other real people, how old do you think this person looks? You then give that person an average of these results and they are left with a very good idea of how old they look.

### How did you build HORU?

I intend to share more about this in the future.

The backend is a Node.JS express application on top of a MySQL database (I will probably switch this out for postgreSQL at some point).

The front-end was originally built with angular but over the last few months was switched out in favor of React.JS. The front end is served by another Node app so that I can do fancy things like server-side rendering.

### What are your plans for HORU?

Starting from today I intend to slowly expose more and more people to the platform. My hopes are that I will only have to do minimal advertising due to the viral nature of such an app.

Once the platform has been confirmed stable with more users, I will really try to push on Twitter and Facebook.

### Sounds good, where can I see the app?
[horu.io](http://horu.io)

---

I hope that serves as a good but short summary of the app. What is of utter most importance at the moment is feedback. I would hugely appreciate any feedback at all about the application, good or bad.

Enjoy your day, and I hope to see you on HORU!
