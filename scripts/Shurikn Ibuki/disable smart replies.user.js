// ==UserScript==
// @name        disable smart replies
// @namespace   shurikn
// @include     https://mail.google.com/mail/*
// @version     1
// @require http://code.jquery.com/jquery-latest.js
// @grant    GM_addStyle
// @description A sript to remove the div with the smart replies in Gmail.
// ==/UserScript==

GM_addStyle(".brb {display: none !important; } ");