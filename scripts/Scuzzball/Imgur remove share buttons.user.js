// ==UserScript==
// @name        Imgur remove share buttons
// @description Removes the share box
// @namespace   http://userscripts.org/users/scuzzball/scripts
// @include     http*://imgur.com/*
// @version     1.0
// @grant       none
// ==/UserScript==

var toRemove = document.getElementsByClassName("fixed-share-container")[0];
toRemove.parentElement.removeChild(toRemove);