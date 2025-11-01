---
title: "MVCGrid.Net"
author: Joseph Bales
date: 2016-12-12
---

I didn't want an entire year to go by without writing a post, so I thought that I would talk a little bit about a neat little tool I found for displaying grid data in ASP.NET MVC 5 projects. It's called [MVCGrid.Net](http://mvcgrid.net/ "MVCGrid.Net"). I say "neat little tool," but it's actually quite powerful now that I know more about how to use it.

For styling it uses [Bootstrap](http://getbootstrap.com/ "Bootstrap") so that makes it easy for me since I already use Bootstrap for basic styling. It also includes a DLL where most of the magic happens and the configuration happens in a `MVCGridConfig.cs` file that you include in your `App_Start` folder.

It allows all kinds of automagic functionality like sorting, paging, filtering, and exporting. You can also allow customized fields and page sizes. A lot of this stuff is built in, but you can also write your own rendering engine and razor templates that will allow you to do whatever it is you want.

One page that might get overlooked in the documentation is the Custom Razor View page. It doesn't have a direct link on the documentation table of contents. It's actually buried in one of the other pages, but here's the [link](http://mvcgrid.net/demo/customrazorview "Link to Custom Razor Views").

The best thing is that it is free, open source (using the MIT license), and fairly well documented. Check it out if you are in need of something to help you get sortable grids up and running quickly in ASP.NET MVC 5.
