// ==UserScript==
// @name         Automatically Reveal Political Posts on Peepeth
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically reveal posts that use the #politics hashtag on Peepeth.
// @author       ashtron
// @match        https://peepeth.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

var alerts = document.getElementsByClassName('politicsShow');

    for (var i = 0; i < alerts.length; i++) {
        alerts[i].click();
    }
})();