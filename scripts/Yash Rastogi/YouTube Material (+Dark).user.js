// ==UserScript==
// @name        YouTube Material (+Dark)
// @version     1.0.0
// @description Enable the Material Design for YouTube.
// @match       http://*.youtube.com/*
// @match       https://*.youtube.com/*
// @grant       none
// @run-at      document-start
// @namespace   https://greasyfork.org/en/scripts/29315-youtube-material-dark
// ==/UserScript==

var loaded = function() {
    document.cookie="VISITOR_INFO1_LIVE=fPQ4jCL6EiE;PREF=f6=7;path=/;domain=.youtube.com";
};