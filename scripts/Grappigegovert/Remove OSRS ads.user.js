// ==UserScript==
// @name         Remove OSRS ads
// @namespace    http://www.grappigegovert.com/
// @version      1.0
// @description  Removes ads from Old School RuneScape
// @include      http://oldschool*.runescape.com/j1
// @copyright    2015, GrappigegovertProductions
// @grant        none
// ==/UserScript==

var iframes = document.getElementsByClassName("top");
var toptr = iframes[0].parentNode.parentNode;
toptr.parentNode.removeChild(toptr);