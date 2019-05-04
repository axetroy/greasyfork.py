// ==UserScript==
// @name        YouTube: Hide Info/Card Button
// @description Hides the info/card button in videos
// @author      Challenger
// @namespace   https://greasyfork.org/users/11442
// @version     1
// @match       http://www.youtube.com/watch*
// @match       https://www.youtube.com/watch*
// @grant       GM_addStyle
// ==/UserScript==
GM_addStyle(".ytp-cards-button {display: none;}");