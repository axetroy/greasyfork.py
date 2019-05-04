// ==UserScript==
// @name        Login Notificaitons
// @description check notifications quickly
// @namespace   http://poems-and-quotes.com
// @include     http://www.poems-and-quotes.com/login.php
// @version     1
// ==/UserScript==

      var currentLocation = window.location.href;

      var newLocation = "http://www.poems-and-quotes.com/login.php";
        var source = document.documentElement.innerHTML;
        var position = document.documentElement.innerHTML.indexOf("You don't have any new private messages.");
        var position2 = document.documentElement.innerHTML.indexOf("You don't have any un-reviewed comments.");
        if (position == -1)
        {
            document.title = "(1) Login Result";
        }
        if (position2 == -1)
        {
            document.title = "(1) Login Result";
        }
      unsafeWindow.setInterval(function(){
        {
 window.location = newLocation; 
        }}, 15000);