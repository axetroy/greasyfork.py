// ==UserScript==
// @name        YouTube Top Header Position Relative 
// @namespace   drev@greasemonkey
// @description Set YouTube's top header position (the top header will no longer scroll along with the page)
// @include     https://www.youtube.com/watch*
// @version     1
// @grant       none
// ==/UserScript==
 
var masterhead = document.getElementById("masthead-positioner");
masterhead.style.position = 'relative';