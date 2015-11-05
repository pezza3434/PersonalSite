---
layout: post
title:  "Reactive 2015"
date:   2015-11-05 09:02:00
categories: javascript
description: An overview of the 2015 React conference in Bratislava, Slovakia.
---

<p class="lead">Over the past two days I have been super lucky to attend Reactive2015. Reactive is a two day conference, in Bratislava, Solvakia, all about React.JS</p>

This is the first developer conference I have attended and my first time in Bratislava. Bratislava itself certainly surprised me! I think it is fair to say that most British people don’t see Bratislava at the top of their holiday list, and I really didn’t know what to expect. The capital city itself is small but beautiful and I would definitely recommend a visit if you are ever in nearby cities such as Vienna.

![Page view stats](/images/posts/reactive/reactive.jpg "Reactive2015")

Over the period of two days there was 30+ talks (including the lightning talks) and I’m not sure there’s much left of my brain after trying to concentrate on so many different ideas and recommendations. However, what was definitely apparent was that a lot of the talks had similar underlying themes or certainly mentioned the following topics:

### Functional Programming

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Thinking that functional programming will be a common topic today <a href="https://twitter.com/hashtag/GoReactive?src=hash">#GoReactive</a></p>&mdash; Alex Perry (@Pezza192) <a href="https://twitter.com/Pezza192/status/661490744595714048">November 3, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

After the third talk it was hugely apparent to me (and everyone on twitter) that functional programming was going to be a hot topic. I kid you not what I say that almost every talk mentioned this style of programming – multiple talks were even based on this idea alone. Functional programming is nothing new but it’s currently making a huge arrival to the javascript scene.

### Immutability

Often mentioned in conjunction with functional programming, it was mentioned multiple times in the conference how mutating state is not a good thing. By using immutable state we also get a lot of things for free such as time travel debugging and reference equality checks. There was consistent recommendations to the immutable.js library.

### React Native

I’ll be honest and say that before the conference I still had mixed views over react native, in the sense of whether or not it was an experimental thing rather than something that could replace cordova and Objective-c app development. I can easily say that these beliefs have been destroyed! React-native was everywhere at Reactive. It still seems that most react developers are yet to try react-native but it was good to see that real production apps are being made with the technology.

### CSS Modules

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">The end of global CSS <a href="https://twitter.com/hashtag/GoReactive?src=hash">#GoReactive</a> <a href="https://t.co/tAiARP5rWt">pic.twitter.com/tAiARP5rWt</a></p>&mdash; Daniel Stefanovic (@DaniStefanovic) <a href="https://twitter.com/DaniStefanovic/status/661510869302538240">November 3, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

This topic comprises of a single talk but something that I was very impressed with. Mark Dalgleish spoke about the problems with css, particularly its global state and what we can do about it. Mark is a co-creator of CSS modules, which is aimed at solving this problem.

### Redux

Redux (Dan Abramov’s creation) is everywhere. And I mean everywhere. It seems to me that Redux is easily now the de facto standard for flux implementations. It was mentioned constantly throughout the entire conference and people who weren’t talking about redux specifically would usually get asked the question “how does this fit into redux”) at the end. If you haven’t looked at redux already, go and look at it.

### Recommended talks

- Day one: [https://www.youtube.com/watch?v=BfzjuhX4wJ0](https://www.youtube.com/watch?v=BfzjuhX4wJ0)
- Day two: [https://www.youtube.com/watch?v=9cIEtC-V2XE](https://www.youtube.com/watch?v=9cIEtC-V2XE)

#### [Abstracting just enough - James Long (00:11:37) Day one](https://www.youtube.com/watch?v=BfzjuhX4wJ0&t=11m37s)
A really good start to the conference. James talks about refactoring and how abstracting too much in your codebase is a bad thing.

#### [The case for css modules – Mark Dalgleish (03:28:00) Day one](https://www.youtube.com/watch?v=BfzjuhX4wJ0&t=3h28m00s)
One of my favourite talks of the conference. This talk really made me think about the problems with css and what we can do to make it better.

#### [Effects as data – Richard Feldman (02:50:00) Day two](https://www.youtube.com/watch?v=9cIEtC-V2XE&t=2h50m00s)
I don’t want to give anything away but this is an excellent talk and opened my eyes to not just javascript.

#### [From react web to native mobile – Brent Vatne (05:42:00) Day Two](https://www.youtube.com/watch?v=9cIEtC-V2XE&t=5h42m00s)
An excellent talk about the things to consider when building native mobile apps. Made me realise how much we take for granted on the web that we can’t take for granted on mobile devices.

#### [Cycle.js – Andre Staltz (08:06:00) Day Two](https://www.youtube.com/watch?v=9cIEtC-V2XE&t=8h06m00s)
An amazing talk to end the conference. Andre practically gives the middle finger to react and talks about his framework cycle.js. Certainly worth a watch.

### My Talk
I did a short 5 minute talk myself, [about moving from angular to react](https://www.youtube.com/watch?v=BfzjuhX4wJ0&t=9h40m50s), worth a watch if you’ve used angular before.

### Time to go home
![Page view stats](/images/posts/reactive/bratislava.jpg "Reactive2015")

As I write this, sitting in a hotel room in Bratislava waiting for the flight home, I can safely say that it’s been an exceptional experience. The conference was incredibly well organized and the organisers did really well to get a good range of speakers to attend the event.

Another huge plus was the chance to talk to the people who's open source tools we use everyday and to realise that they’re actually still human! Some even have wives and kids!

Finally, a huge thank you to [Laterooms](http://www.laterooms.com) for sending me to the conference.
