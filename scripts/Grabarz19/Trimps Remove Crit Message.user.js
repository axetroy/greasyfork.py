// ==UserScript==
// @name        Trimps Remove Crit Message
// @namespace   https://greasyfork.org/en/scripts/16798-trimps-remove-crit-message
// @description Removes the crit message from Trimps
// @include     http://trimps.github.io*
// @include     https://trimps.github.io*
// @version     1.0001
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle("#critSpan, #badCrit{color:rgba(0,0,0,0);}");