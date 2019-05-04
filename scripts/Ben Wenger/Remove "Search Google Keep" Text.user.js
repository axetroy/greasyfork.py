// ==UserScript==
// @name        Remove "Search Google Keep" Text
// @namespace   n/a
// @description Removes placeholder text from search bar in google keep.
// @include     *keep.google.com*
// @version     1.0
// @grant       none
// ==/UserScript==

document.getElementById("gbqfq").placeholder = "";