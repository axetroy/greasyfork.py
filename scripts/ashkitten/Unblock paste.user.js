// ==UserScript==
// @name         Unblock paste
// @namespace    me.ashlea.unblockpaste
// @version      1.0
// @description  Unblock the pasteroonies!
// @author       Ash Lea
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('paste', function(e) {
        if (e.clipboardData.getData("text/plain")) {
            e.stopImmediatePropagation();
        }
    }, true);
})();