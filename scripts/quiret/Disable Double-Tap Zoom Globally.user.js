// ==UserScript==
// @name         Disable Double-Tap Zoom Globally
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  disables nasty vendor-specific touch features that are annoying
// @author       The_GTA
// @match        *
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.document.body.style.touchAction = "manipulation";
})();