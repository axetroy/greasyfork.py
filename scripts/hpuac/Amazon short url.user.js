// ==UserScript==
// @name         Amazon short url
// @namespace    https://puac.de/
// @version      0.1.0
// @description  Replaces the current Amazon product URL in the address bar with a shorter version.
// @author       Hans Puac
// @match        https://www.amazon.com/*
// @match        https://www.amazon.de/*
// @match        https://www.amazon.es/*
// @match        https://www.amazon.fr/*
// @match        https://www.amazon.it/*
// @match        https://www.amazon.nl/*
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    var asin = document.getElementById('ASIN');

    if (asin) {
        var url = document.location.protocol + '//' + document.location.host + '/dp/' + asin.value;

        if (url === document.location.href) {
            return;
        }

        window.history.replaceState(null, null, url);
    }
})();
