// ==UserScript==
// @name         mtg laziness intensifies (poll hider)
// @namespace https://greasyfork.org/users/710
// @version      0.3
// @description  enter something useful
// @author       Tjololo
// @match        http://mturkgrind.com/threads/*
// @match        http://www.mturkgrind.com/threads/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant        GM_log
// ==/UserScript==

$("div.NoAutoHeader.PollContainer").html('<b><font align="center" color="ff3300" size="4em">I AM A LAZY MOTHERFUCKER WHO CAN\'T GOD DAMN SCROLL MORE THAN 6 LINES</b></font>');