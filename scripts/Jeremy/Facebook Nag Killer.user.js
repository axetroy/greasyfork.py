// ==UserScript==
// @name        Facebook Nag Killer
// @namespace   http://goo.gl/m79y0X
// @description Removes the nag screen that shows when user session is inactive.
// @include     https://www.facebook.com/*
// @version     1.0
// @grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function delay() {
  var x = jQuery("#pagelet_growth_expanding_cta").remove();
}
setTimeout(delay,500);
setTimeout(delay,3000); //justincase
