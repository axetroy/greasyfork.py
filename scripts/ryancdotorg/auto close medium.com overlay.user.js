// ==UserScript==
// @name         auto close medium.com overlay
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Closes the "create an account" overlay that pops up when reading a post on medium.
// @author       Ryan Castellucci @ryancdotorg
// @match        https://medium.com/@*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var t1 = Date.now();

    var tryClose = function() {
        var e = document.querySelector('[data-action=overlay-close]');
        if (e) {
            e.click();
        } else if (Date.now() - t1 < 5000) {
            setTimeout(tryClose, 16);
        }
    };
    tryClose();
})();