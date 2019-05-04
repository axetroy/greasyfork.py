// ==UserScript==
// @name Kasitime Tweak
// @description Allows selection of lyrics and opening of the context menu on Kasitime; compatible with Rikaichan
// @version 1.0
// @include http://www.kasi-time.com/*
// @released 2014-06-08
// @updated 2014-06-08
// @grant none
// @compatible Greasemonkey
// @namespace https://greasyfork.org/users/5918
// ==/UserScript==
document.body.removeAttribute("oncontextmenu");
document.body.removeAttribute("onselectstart");
document.getElementById("center").removeAttribute("onmousedown"); 