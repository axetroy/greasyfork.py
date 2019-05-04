// ==UserScript==
// @name        Google Calendar "hide morning and night" lab - hide night
// @version     1.3
// @description Hides "night" part of lab
// @match       https://www.google.com/calendar/*
// @match       https://calendar.google.com/calendar/*
// @namespace   https://greasyfork.org/users/1858
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(" .crd-bottom, .cgd-col-last, .tg-hourmarkers > div:last-child { display:none; } .crd-col.tg-times-pri, .crd-col.tg-times-sec { top:-62px !important; } ");
