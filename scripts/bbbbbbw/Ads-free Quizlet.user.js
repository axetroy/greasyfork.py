// ==UserScript==
// @name         Ads-free Quizlet
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  去除Quizlet广告 / Remove ads on Quizlet
// @author       bbbbbbr
// @match        https://quizlet.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function deleteAdz() {
        while (document.getElementsByClassName("SiteAd")[0] != null) {
            document.getElementsByClassName("SiteAd")[0].remove();
        }
    }
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new MutationObserver(function(records) {
        deleteAdz();
    });
    var options = {
        attributes: true,
        childList: true,
        subtree: true
    };
    observer.observe(document.body, options);
})();