// ==UserScript==
// @name        Remove Google's "Install Chrome" browser and search engine switching nag messages
// @description This removes the "Set Google as your default search engine" warning and removes the prompts to switch to the Chrome browser. Based on https://greasyfork.org/scripts/9860-hide-google-default-search-warning/code/Hide%20Google%20Default%20Search%20Warning.user.js
// @include     http://www.google.com.*/*
// @include     https://www.google.com.*/*
// @version     1.2
// @grant       none
// @namespace https://greasyfork.org/users/89819
// ==/UserScript==

var pushdown = document.getElementById('pushdown');
if (pushdown) {
    pushdown.parentNode.removeChild(pushdown);
}
var promo = document.querySelector("div[aria-label]");
    promo.parentNode.removeChild(promo);