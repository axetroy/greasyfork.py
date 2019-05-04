// ==UserScript==
// @name        SlimFbGames
// @namespace   https://facundogoni.com.ar
// @description Remove Facebook Right Column and Right Dock in Games
// @include     http://apps.facebook.com/*
// @include     https://apps.facebook.com/*
// @version     1
// @grant       none
// ==/UserScript==

var rightCol = document.getElementById("rightCol");
rightCol.parentNode.removeChild(rightCol);

var fbDock = document.getElementsByClassName("fbDock");
fbDock[0].remove();