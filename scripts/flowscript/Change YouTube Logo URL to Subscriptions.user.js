// ==UserScript==
// @name        Change YouTube Logo URL to Subscriptions
// @namespace   https://greasyfork.org/en/users/158563
// @description Simple script that changes the YouTube logo URL from Home to Subscriptions. Only works with the old layout.
// @include     http://*.youtube.com/*
// @include     http://youtube.com/*
// @include     https://*.youtube.com/*
// @include     https://youtube.com/*
// @version     1.0.1
// @grant       none
// @require     http://code.jquery.com/jquery-1.11.1.min.js
// ==/UserScript==

$("#yt-masthead-logo-fragment a[href*='/']").attr("href", "/feed/subscriptions");