// ==UserScript==
// @name         Dsrealm link updater
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Update old links on Dsrealm
// @author       airminer
// @match        https://dsrealmtranslations.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    [].forEach.call(document.querySelectorAll('a[href*="dsrealm.com"]'), function(item) {
        item.href = item.href.replace(/dsrealm\.com/,"dsrealmtranslations.com");
    });
    [].forEach.call(document.querySelectorAll('a[href*="lucksego.com"]'), function(item) {
        item.href = item.href.replace(/lucksego\.com/,"dsrealmtranslations.com");
    });
})();