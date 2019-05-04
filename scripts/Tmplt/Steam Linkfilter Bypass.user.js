// ==UserScript==
// @name Steam Linkfilter Bypass
// @version 0.1
// @description Bypasses the steam link filter
// @match https://steamcommunity.com/linkfilter/*
// @run-at document-start
// @namespace https://greasyfork.org/users/3865
// ==/UserScript==

var URL = document.URL;
var str = URL.split("url=");
window.location = str[1]; 