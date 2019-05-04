// ==UserScript==
// @name        RIP Twitter Moments
// @namespace   misentropic.com
// @version 0.1
// @description Removes Twitter Moments from the web client
// @match    https://twitter.com/*
// @copyright Chris Engel
// @license WTFPL v2; http://www.wtfpl.net/about/

// ==/UserScript==
var moments = document.querySelector('.moments');

if (moments) {
  moments.parentNode.removeChild(moments);
}