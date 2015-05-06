---
layout: post
title:  "How to host your node app and database with Dokku"
date:   2015-05-05 20:02:00
categories: node
description: Learn how to host your node app and database with Dokku
---

<p class="lead">So you’ve built a node app? But now you want to host it somehow and you’re stuck?</p>

There is increasingly more and more tutorials and documentation on how to build your node app. However a huge part of your process is getting it online for other people to use, but finding easy to follow guides to do this (as I found) is difficult.

As did I, there is also a high chance that you have a DB associated with your app. This guide will also teach you how to set up a DB for your app, how you can get your app talking to it, and how you can manage this database. I personally use MySQL however this could easily be interchanged to use PostgreSQL or mongoDB.

Hosting your node app is a different beast than hosting your typical LAMP stack app. Gone are the days of uploading the latest version of your app through FTP. Most shared hosting providers, which you may be using at the moment, often offer no or limited node support and so you’re left looking for alternatives.

### Enter Digital Ocean

[![Digital Ocean Logo](/images/posts/dokku-deploy/DO_Logo_Horizontal_Blue.png "Digital Ocean Logo")](https://www.digitalocean.com/?refcode=0c04e7483ee0)

You may have heard of a service called Heroku. Heroku enables you to easily host your node app simply by pushing to a git remote; no more FTP (YEY!). The downside of Heroku is that it quickly gets expensive as soon as you try to drive any real traffic to it; you may have also noticed that the cheap packages of Heroku can be really slow, as it only spins up your app once a user makes a request to it.

I want complete control over my apps, however (I’m barely a infrastructure newbie) I still want it to be easy.

[Digital Ocean](https://www.digitalocean.com/?refcode=0c04e7483ee0) offers super cheap virtual private servers. There’s a lot of buzz around Digital Ocean at the moment, and for good reason. Their VPS boxes start at only $5 a month.

If you’re like me, the idea of navigating through a linux server and getting an app on to it from scratch is a daunting one….

### Enter Dokku

Dokku is built on something called Docker (you don’t even need to know that). What’s great about Dokku is that we can easily push apps to our server as easily as we can with Heroku. This is a big win, we now have the benefits of complete control over a server but with easy Heroku style deploys. 

### SSH Keys

Go ahead to the [digital ocean site](https://www.digitalocean.com/?refcode=0c04e7483ee0) and create an account.

The first thing I would recommend doing, before spinning up a server, would be to create your SSH keys. SSH keys enable you to login to your server as simply as:

```bash
ssh root@your-ip.com
```

without having to type a password every time. Using SSH keys is the recommended way of logging onto your server securely. 

You may have generated ssh keys for your computer already, lets check. Open up terminal and type:

```bash
ls ~/.ssh
```

If you see id_rsa and id_rsa.pub then you can skip ahead to **create your droplet**. If not, type the following into your terminal:

```bash
ssh-keygen –t rsa
```

Leave the location of the key as default and for the purpose of this tutorial, do not enter a password for the ssh key. If you enter a password you will have to type this password every time you log into the server.

If you type the following into your terminal you should now see the id_rsa and id_rsa.pub as mentioned before:

```bash
ls ~/.ssh
```

id_rsa is the private key that will only stay on your computer and id_rsa.pub is the public key that you can give out to different services. Lets copy that public key:

```bash
cat ~/.ssh/id_rsa.pub | pbcopy
```

Back to DigitalOcean, go into your settings, click on security and add your ssh key. Call it anything you wish and paste the ssh key into the box below. Your ssh key should be a string about four lines long of letters and numbers. 

### Create your droplet

Now the boring part is done, it’s time to spin up your droplet. Click on the create droplet button and you will see all the options available when creating your droplet.

The options are fairly self explanatory here, just two things to remember:

1)	Remember to add your ssh keys 
2)	Choose the Dokku image which is available under the applications tab

[![alt Creating a dokku droplet](/images/posts/dokku-deploy/dokkucreatedroplet.png "Creating a dokku droplet")](https://www.digitalocean.com/?refcode=0c04e7483ee0)

For the purposes of this tutorial, I’d recommended choosing the cheapest option, but that’s completely up to you. You can delete the droplet easily later if you like and you will only pay for the tiny amount of time that the droplet has been live.

**You need to DELETE the droplet to stop being charged for it. You will still be charged the hourly rate even if you power it down.**

Once your droplet has been created, go to the IP address of your box and confirm the dokku settings. The default settings will be fine. 

### Deploy your app

For the purposes of this guide I have created a [very basic app](https://github.com/pezza3434/dokku-deploy-tutorial). The app simply displays a welcome message, connects to a database (with sequelize) and pulls a user from the user table. If the connection to the DB fails then a error message is displayed. If not then all the users of the database are displayed. You are welcome to [clone this app](https://github.com/pezza3434/dokku-deploy-tutorial) as I will use it to discuss other areas of Dokku.

First of all we are going to forget about the DB and deploy the pure express app. Find the IP of your droplet from Digital Ocean, open a terminal window and type:

```bash
ssh root@your-droplet-ip-address
```

It may say that authenticity can’t be established and are you sure you want to continue, just type yes. Presuming that all goes ok, congratulations, you’ve set up your own server with dokku running and are ready to start deploying apps!

If you type ‘dokku’ in the terminal it will display all the available options that dokku gives you, it might be worth having a quick read through these to get familiar. 

The first thing I’m going to do is create an app called ‘myapp’. To do this I type:

```bash
dokku apps:create myapp
```

The next thing you will need to do is setup a new git remote for dokku and push to it. There will be ways to do this from a git client if you have one, but I’m going to show you how from the command line.

Open a new terminal window and navigate to the root of your app (where package.json is):

```bash
cd /route/to/yourapp
```

If you haven’t set up git already in this folder run:

```bash
git init
```

Add all your folders and commit them

```bash
git add .
git commit –m "first commit"
```

We now need to add a remote to dokku

```bash
git remote add dokku dokku@your-ip.com:your-app-name
```

Once you’ve done that, you can now deploy your app whenever you want with the following command. Lets run it now:

```bash
git push dokku
```

This may take a few seconds to run…be patient.

If all goes to plan, your application should have deployed and you will be given a direct link to your app

In regards to my app (which you may have used yourself), when I browse to the link I can see that the application has been deployed however, predictably, the app tells me that the connection to the database has failed.

![alt example app failing](/images/posts/dokku-deploy/deployconnectionfailed.png "Example app failing")

### How to connect the app to a database

Dokku manages databases with plugins. For example, I would like a mysql database so I can install a mysql plugin which allows me to spin up mysql databases.

Unfortunately the mysql plugin has been broken for some time with the latest version of dokku so I would recommend [https://github.com/k2nr/dokku-mysql-plugin](https://github.com/k2nr/dokku-mysql-plugin) fork instead. If you are using postgreSQL then you will want to use [https://github.com/Kloadut/dokku-pg-plugin](https://github.com/Kloadut/dokku-pg-plugin) or similar. Installing the mysql plugin is as simple as running the following commands back in your SSH window:

```bash
cd /var/lib/dokku/plugins 
git clone https://github.com/k2nr/dokku-mysql-plugin
dokku plugins-install
```

After this, if all has been successful, if you now type dokku you should now see some more actions in relation to mysql. Lets create a mysql container:

```bash
dokku mysql:create nameofdatabase
```

I would recommend using the same name for your database as you did for your app as dokku will automatically link them. If you didn’t use the same name them you need to run this:

```bash
dokku mysql:link appname dbname
```

By linking the app and database means that **dokku will inject connection settings into your app in the form of environment variables.** 

This is great because you never have to worry about these settings changing, and you can leave your code public without the possibility of other people gaining private details.

In node you can access environment variables with process.env.ENVIRONMENT_VARIABLE. You will see here that I created a object in config.js with all my database details in using these variables:

```javascript
module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'myapp',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 8889
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
};
```

To see all the connection variables that dokku will inject into your app run:

```bash
dokku config yourappname
```

I also want dokku to inject a further environment variable into my app. This is due to the fact that the DB config is chosen by a NODE_ENV variable. 

```bash
dokku config:set myapp NODE_ENV=production
```

This tells my app to use the correct DB config object.

If we view the app now, we see that the error message has changed.

![alt app failed to find db](/images/posts/dokku-deploy/failedtofinddb.png "App failed to find db")

It has made a database connection, but failed to find the users table in the database; this of course makes sense because the database is currently empty.

### How to manage your dokku database

I’m sure there are other ways to upload or edit your database on your dokku box however I’m going to be honest and say I don’t really know what these are! 

I believe the easiest way by far to manage your hosted DB is to connect it to a client such as [Sequel Pro](http://www.sequelpro.com/). Unfortunately, Sequel Pro is only available on macs, however I am more than sure there are similar applications for Windows. 

Connecting to your Database is not quite as simple as connecting to your local DB, you need to connect via SSH. The client will ask for some additional details here such as your SSH key, your SSH user and port. You can easily find out the details for your DB on your dokku box by typing:

```bash
dokku mysql:info myapp
```

SSH host is the IP address of your dokku box, we logon to the box with root and so the SSH username is root. You can upload your SSH key for your SSH password and I’ve had no problems leaving the SSH port blank. 

![alt Example of how to connect to db using sequel pro](/images/posts/dokku-deploy/sequelprossh.png "Example DB connection")

I won’t go into detail about how to use Sequel Pro (it’s fairly self explanatory), but from here you can now easily import your current DB or start creating a structure for your new one. At this point I now import my simple DB that I have included in the GIT repository. 

If we now refresh the live app

![alt image of working app](/images/posts/dokku-deploy/successimage.png "Working app example")

Give yourself a pat on the back! We now have a working, deployed, node, dokku app which connects to a live database. It’s taken a while to get to this stage, but I believe that once you’ve done it once the next time is much easier. You’ve also learnt a hell of a lot in the process.
