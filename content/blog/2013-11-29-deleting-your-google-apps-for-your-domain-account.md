---
title: "Deleting Your Google Apps for Your Domain Account"
author: Joseph Bales
date: 2013-11-29
---
Okay, I spent about an hour trying to figure this out and finally did it. Google does not make deleting information easy because that information is their product. So the documentation about this particular subject is very sparse and ultimately I got what I needed from a obscure post in one of Google's product forums. I'm posting this here for posterity.

First let me start with how I ended up with a Google Apps account. Several years ago I was going on the road for a while and decided to manage my domain through <a href="http://wordpress.com" title="Wordpress" target="_blank">Wordpress.com</a>. One of the features that Wordpress offered was integration with Google Apps. I was a big fan of Gmail at the time, so I signed up so that I could manage my josephbales.com email addresses in Gmail.  I set up one address and forgot about it for 5 years.

Fast forward a few years.  I've decided that in light of recent events that Google isn't the coolest anymore. I'm still sticking with them for the moment, but I wanted to make sure I had full control of my own domain and email accounts and that none of that information was connected to a Google product.

When you search for instructions on how to delete your Google Apps account you get <a href="https://support.google.com/a/answer/1257646?hl=en" target="_blank">this url</a> as the first result in Google. These instructions are great for anyone who has been actively administering their Google Apps account.  However, if you set your Google Apps account up in 2007 and promptly forgot about it, a few things have changed and these instructions are worthless.

The real key is figuring out what the administrative user for the account is. If you just have one user, it may not be that user which was what was happening in my case. The admin user is admin@your-domain.com or possibly superuser@your-domain.com (where your-domain.com is your actual domain). The user "admin" worked for me.  Instead of signing in as my normal user, I signed in as admin and was able to follow the instructions for the search results I mentioned above. It might help to do this in Privacy Mode in whatever browser you happen to be using, just to make sure browser cookies are not accidentally logging you in as someone else.  Hope this helps all you people out there.
