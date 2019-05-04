// ==UserScript==
// @name         Amazon Redirecter to Smile
// @namespace    https://greasyfork.org/de/scripts/378578-amazon-redirecter-to-smile
// @version      0.2
// @description  Redirect from amazon domains to their smile subdomains
// @author       Guitar Hero
// @grant        none
// @match        http://www.amazon.com/*
// @match        https://www.amazon.com/*
// @match        http://www.amazon.co.uk/*
// @match        https://www.amazon.co.uk/*
// @match        http://www.amazon.de/*
// @match        https://www.amazon.de/*
// ==/UserScript==

(function() {
    'use strict';

    if (window.self !== window.top) {
        return;
    }
    var matches = /(http[s]?\:\/\/)www(\.amazon.*)/.exec(window.location.href);
    if (matches.length != 3) {
        return;
    }
    window.location.replace(matches[1]+"smile"+matches[2]);

})();