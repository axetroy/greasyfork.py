// ==UserScript==
// @name         Legacy Twitter
// @namespace    Azzu
// @version      1.0.1
// @description  Switches all twitter to legacy twitter.
// @author       Azzu
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (location.hostname !=='mobile.twitter.com') {
        location.hostname = 'mobile.twitter.com';
    }
})();