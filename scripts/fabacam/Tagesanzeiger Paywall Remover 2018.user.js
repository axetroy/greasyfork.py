// ==UserScript==
// @name        Tagesanzeiger Paywall Remover 2018
// @namespace   http://www.tagesanzeiger.ch
// @version     0.2
// @description The userscript removes the "paywall" after site load.
// @match       *://*.tagesanzeiger.ch/*
// @copyright   2018 @fabacam based on Script from honsa and Vinz666
// ==/UserScript==

(function() {
    'use strict';

    // check if on article page
    window.addEventListener('load', function() {
        // some css
        if (document.getElementById("overlay_wrap")) {
            document.getElementById("overlay_wrap").parentNode.style.display = 'none';
            document.getElementsByTagName('body')[0].classList.remove("modal-open");
            document.getElementsByTagName('body')[0].style.cssText = 'overflow: auto !important';
            document.getElementsByTagName('body')[0].style.userSelect = 'auto';
        }
    }, false);
})();