// ==UserScript==
// @name         NZZ Paywall Remover
// @namespace    https://www.nzz.ch
// @version      1
// @description  Remove NZZ Paywall
// @author       the internet
// @match        *://www.nzz.ch/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36 Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
    setUserAgent(window, userAgent);
})();

function setUserAgent(window, userAgent) {
    // Works on Firefox, Chrome, Opera and IE9+
    if (navigator.__defineGetter__) {
        navigator.__defineGetter__('userAgent', function () {
            return userAgent;
        });
    } else if (Object.defineProperty) {
        Object.defineProperty(navigator, 'userAgent', {
            get: function () {
                return userAgent;
            }
        });
    }
    // Works on Safari
    if (window.navigator.userAgent !== userAgent) {
        var userAgentProp = {
            get: function () {
                return userAgent;
            }
        };
        try {
            Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
        } catch (e) {
            window.navigator = Object.create(navigator, {
                userAgent: userAgentProp
            });
        }
    }
}