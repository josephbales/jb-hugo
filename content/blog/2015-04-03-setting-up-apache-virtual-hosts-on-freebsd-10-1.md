---
title: "Setting up Apache Virtual Hosts on FreeBSD 10.1"
author: Joseph Bales
date: 2015-04-03
---
I've been messing around on <a title="The DigitalOcean website" href="http://digitalocean.com" target="_blank">DigitalOcean</a> with a <a title="FreeBSD website" href="http://freebsd.org" target="_blank">FreeBSD</a> 10.1 droplet. First let me say that FreeBSD is awesome. The thing that I like the most about the BSDs is that they don't beat about the bush when it comes to making an OS because the purpose of each BSD <em>is</em> the OS. My main comparison is to Linux based OSes, which are awesome in their own way, but feel a bit splintered. With the BSDs it's not just a kernel with a bunch of GNU apps thrown at it to make it usable, they take great pains to produce a complete OS. So when I need to know how to do something on FreeBSD, there's probably already a darn good document out there with detailed instructions. Hell, you rarely have to go outside the FreeBSD manual unless you're doing something really complex. It just works and that's great!

Now on to why I'm writing this post. I was wanting to set up Apache on my FreeBSD 10.1 machine to serve up 3 different websites. In the Apache world this is called Virtual Hosts. So let us say that we have 3 different addresses, but only one IP, now what? Virtual Hosts, and specifically Named Virtual Hosts. Configuration is dead simple.

First, locate your httpd.conf file. The Apache configuration file has a lot of names on various different Linuxes, but on FreeBSD it's just httpd.conf and it is located at /usr/local/etc/apache24/httpd.conf. Open that file and go all the way to the bottom.

Second you will need to add in VirtualHost entries for each of your sites. You'll also need to include one for the default IP address of the machine, otherwise it will point to the first VirtualHost entry.

```xml
<VirtualHost *:80>
ServerName 127.0.0.1
DocumentRoot /usr/local/www/apache24/data
</VirtualHost>
```

```xml
<VirtualHost *:80>
ServerName example1.com
DocumentRoot /usr/local/www/apache24/data/example1.com
</VirtualHost>
```

```xml
<VirtualHost *:80>
ServerName example2.com
DocumentRoot /usr/local/www/apache24/data/example2.com
</VirtualHost>
```

The first line of each listing tells Apache that this is a VirtualHost entry and that it should listen to any incoming requests (the star) on port 80. The ServerName line tells Apache the name to look for for that particular entry. If a request comes in for example1.com, then the second entry above will be used. The first entry will be used if someone just types in the IP address of the server (assuming that 127.0.0.1 is the IP). The DocumentRoot line tells Apache where the files for that site are located. I tend to create a new folder for each site in the main document root folder so that all my sites are in a common place. The last line closes the listing.

Once you've edited your file, simply write it out and restart the Apache service to pick up the new settings.

```
sudo service apache24 restart
```

And it's that simple! For more detailed documentation on Virtual Hosts you should read the official <a title="Apache Virtual Hosts documentation link" href="http://httpd.apache.org/docs/2.4/vhosts/" target="_blank">Apache documentation</a>. Have fun with it!
