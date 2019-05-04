// ==UserScript==
// @name               Bring Back Old Reddit
// @namespace          https://greasyfork.org/en/users/105361-randomusername404
// @description        Always redirects to old-Reddit, avoiding Reddit's redesign.
// @include            *://www.reddit.com/*
// @version            1.00
// @run-at             document-start
// @author             RandomUsername404
// @grant              none
// @icon               https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-76x76.png
// ==/UserScript==

window.location.replace("https://old.reddit.com" + window.location.pathname);