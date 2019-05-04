// ==UserScript==
// @run-at document-start
// @name        Bing to Baidu
// @namespace   div.gg
// @description This will redirect you to Baidu from Bing after you search.
// @include     http://*.bing.com/search?*
// @include     https://*.bing.com/search?*
// @version     1
// @grant       none
// ==/UserScript==
var target = document.URL.match(/\=[^&]*/);
var target = target[0];
var target = target.slice(1, target.length);
var newurl = "https://www.baidu.com/s?ie=utf8&oe=utf8&wd=" + target ;
if (newurl != document.URL) location.replace(newurl);