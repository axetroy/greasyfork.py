// ==UserScript==
// @id             Wanikani Landscape Friendly
// @name           Wanikani Landscape Friendly
// @namespace      wk-landscape-friendly
// @description    Makes Wanikani Review font smaller
// @include        http*://www.wanikani.com/review/session
// @include        http*://www.wanikani.com/lesson/session
// @grant          GM_addStyle
// @version        1
// ==/UserScript==

document.getElementById("character").style.lineHeight = '2em';
document.getElementById("character").style.fontSize = '4em';
document.getElementsByTagName("h1")[0].style.fontSize = '1em';
