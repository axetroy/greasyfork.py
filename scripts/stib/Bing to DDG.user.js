// ==UserScript==
// @run-at document-start
// @name        Bing to DDG
// @namespace   pureandapplied.com.au
// @description Redirects Bing searches to DuckDuckGo. Use it with EdgeDeflector to banish Bing
// @include     http://*.bing.com/search?*
// @include     https://*.bing.com/search?*
// @version     1
// @grant       none
// ==/UserScript==

var newurl = "https://duckduckgo.com/?"+document.URL.match(/q\=[^&]*/);
if (newurl != document.URL) location.replace(newurl);