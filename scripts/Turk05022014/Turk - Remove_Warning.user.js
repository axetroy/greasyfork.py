// ==UserScript==
// @name          Turk - Remove_Warning
// @include       https://www.mturk.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @description   Hides "Message Warning"
// @version 0.0.1.20141101041655
// @namespace https://greasyfork.org/users/6503
// ==/UserScript==

// The below removes "Message Warning"

$("div.message.warning:contains(Maintenance)").hide();
