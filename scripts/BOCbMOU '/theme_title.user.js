// ==UserScript==
// @name        theme_title
// @namespace   1
// @include     http://www.eador.com/B2/viewtopic.php*
// @include     http://eador.com/B2/viewtopic.php*
// @version     1
// @grant       none
// @description Add normal titles
// ==/UserScript==

document.title = document.querySelector('h1 > a.nul').text;