// ==UserScript==
// @name         Uncheck 'trust this device' for Google login - 2018 edition
// @namespace    de.yaph1l.tampermonkey
// @version      0.1
// @description  This script attempts to uncheck the 'trust this device' option that is enabled by default when signing into a Google account with 2FA enabled
// @author       YaPh1l
// @match        *://accounts.google.com/*
// @noframes
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Note that this timeout approach is not very nice, but it works as far as I can tell

    function tryUncheck() {
        var chkbox = document.querySelector('[aria-labelledby="trustDeviceLabel"]');
        if(chkbox != null) {
            //chkbox.setAttribute('aria-checked', 'false');
            if(chkbox.getAttribute('aria-checked')) {
                chkbox.click();
            }
        } else {
            window.setTimeout(tryUncheck, 250);
        }
    }

    tryUncheck();

})();