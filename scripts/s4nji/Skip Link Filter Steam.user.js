// ==UserScript==
// @name        Skip Link Filter Steam
// @namespace   s4nji
// @description Skips the link filter on steam
// @include     https://steamcommunity.com/linkfilter/?url=*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function() {
var pat = /\??url=(.+)\&?/i;
var url = window.location.search;

window.location = url.match(pat)[1];
})();