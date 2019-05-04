// ==UserScript==
// @name        Fix drop-down menus on Steam store
// @namespace   JeffersonScher
// @description Keep the Games, Software, Hardware and For You menus from disappearing! (2015-10-16)
// @include     http*://store.steampowered.com/*
// @version     1
// @grant       none
// ==/UserScript==

// Move the flyout div's for Games, Software, Hardware and For You into the container of that caption so they don't close
var flyouts = document.querySelectorAll('#store_header .store_nav div[id*="_flyout"]'); 
for (var i=0; i<flyouts.length; i++){
  flyouts[i].previousElementSibling.appendChild(flyouts[i]);
}