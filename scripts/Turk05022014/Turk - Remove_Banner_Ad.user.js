// ==UserScript==
// @name          Turk - Remove_Banner_Ad
// @include       https://www.mturk.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @description   Hides "Hello Workers!" banner
// @version 0.0.1.20150210031124
// @namespace https://greasyfork.org/users/6503
// ==/UserScript==

// The below removes "Hello Workers!" banner

$("div.message.warning:contains(Hello Workers)").hide();
