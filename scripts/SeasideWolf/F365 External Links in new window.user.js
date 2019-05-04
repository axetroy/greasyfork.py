// ==UserScript==
// @name         F365 External Links in new window
// @description  Target _blank
// @match        http://forum.football365.com/*
// @grant        none
// @version 0.0.1.20150806075943
// @namespace https://greasyfork.org/users/14019
// ==/UserScript==

$("a.postlink:not([href*='forum.football365'])").attr("target","_blank")