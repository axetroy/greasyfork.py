// ==UserScript==
// @run-at document-start
// @name        Smile Amazon Redirect
// @description This will redirect you to Amazon Smile from regular Amazon
// @include     http://www.amazon.com/*
// @include     https://www.amazon.com/*
// @version     1.1
// @grant       none
// @namespace https://greasyfork.org/users/74785
// ==/UserScript==


var newurl = document.URL.replace('www.amazon.com','smile.amazon.com');
if (newurl != document.URL) location.replace(newurl);