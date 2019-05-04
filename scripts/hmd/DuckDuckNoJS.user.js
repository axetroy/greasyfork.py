// ==UserScript==
// @name DuckDuckNoJS
// @namespace https://greasyfork.org
// @description Forces DuckDuckGo to automatically redirect to non-JavaScript HTML search results, for those that disable JavaScript.
// @include https://duckduckgo.com/?*
// @exclude https://duckduckgo.com/html*
// @version 1
// @grant none
// ==/UserScript==
window.stop();
var query = location.search;
query = query.split('q=');
window.location = "https://duckduckgo.com/html/?q="+query[query.length-1];