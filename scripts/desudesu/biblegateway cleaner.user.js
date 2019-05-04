// ==UserScript==
// @name biblegateway cleaner
// @namespace Violentmonkey Scripts
// @description Hides some stuff for a cleaner view
// @version 0.1
// @match https://www.biblegateway.com/passage/
// @grant GM_addStyle
// ==/UserScript==
GM_addStyle (" .sidebar-wrap, .recommendations, .navbar, footer {display: none;} .text {font-size: 18px;}");