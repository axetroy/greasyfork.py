// ==UserScript==
// @name        Netflix Disable Billboard Video
// @description Removes the background video trailers that sometimes appear on Netflix.
// @namespace   aninhumer
// @include     https://www.netflix.com/browse
// @version     1
// @grant       none
// ==/UserScript==

var billboard = document.getElementsByClassName('billboard-motion')[0];

billboard.parentNode.removeChild(billboard);