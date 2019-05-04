// ==UserScript==
// @name         Twitter to Mobile
// @version      0.2
// @description  Just converting the twitter.com to mobile version...(except for sharing something)
// @author       Alex.nfo
// @include      *://twitter.com/*
// @exclude      *://twitter.com/intent/*
// @exclude      *://twitter.com/share*
// @grant        none
// @run-at       document-start
// @namespace https://greasyfork.org/users/232915
// ==/UserScript==

(function() {location.host = "m.twitter.com";})();