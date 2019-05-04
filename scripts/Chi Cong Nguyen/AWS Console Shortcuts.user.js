// ==UserScript==
// @name         AWS Console Shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Keyboard hotkeys
// @author       nchicong41@gmail.com
// @match        https://*.aws.amazon.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('keydown', function(e) {
        if (e.altKey) {
            e.preventDefault();

            if (document.querySelector(".nav-menu-content-close").offsetParent) {
                document.querySelector('.nav-menu-content-close').click();
            } else {
                document.querySelector('.nav-elt-label').click();
                document.querySelector("#awsc-services-search-autocomplete").value = "";
            }
        }
    });
})();