// ==UserScript==
// @name        EB Anti-Adblock
// @namespace   EB Anti-Adblock
// @description fjerner Adblock blockeren
// @include     http://ekstrabladet.dk
// @include     http://ekstrabladet.dk/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

$('#eb_fullBody').nextAll().remove()