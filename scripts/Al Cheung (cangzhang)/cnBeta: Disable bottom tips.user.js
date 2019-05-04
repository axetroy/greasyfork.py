// ==UserScript==
// @name         cnBeta: Disable bottom tips
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Disable bottom tips.
// @author       Al Cheung @cangzhang
// @run-at document-end
// @match        *://*.cnbeta.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    new MutationObserver(function(mutations) {
        removeAds();
    }).observe(document, {childList: true, subtree: true});

    function removeAds() {
        $('body').children().filter(function() {
            var shouldHide = $(this).css('z-index') > 10;
            if (shouldHide) {
                $(this).remove();
            }
        });}
})();