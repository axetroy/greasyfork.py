// ==UserScript==
// @name         Etsy GDPR
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove GDPR violation garbage from Etsy
// @author       You
// @match        https://www.etsy.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var banner, consent, timer;
    var clearc = 0;

    let fun = () => {
        banner = document.querySelector("[data-etsy-promo-banner]");
        if (banner) {
            banner.remove();
            clearc++;
        }

        consent = document.querySelector("[data-gdpr-consent-prompt]");
        if (consent) {
            consent.remove();
            clearc++;
        }

        if (timer && clearc >= 2) clearInterval(timer);
    };

    fun();
    timer = setInterval(fun, 1);

    // Your code here...
})();