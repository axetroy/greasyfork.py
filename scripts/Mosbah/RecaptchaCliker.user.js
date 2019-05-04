// ==UserScript==
// @name         RecaptchaCliker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  RecaptchaClikerCheckBox
// @author       MegaBOuSsOl
// @match        *
// @grant        God
// ==/UserScript==

var clickCheck = setInterval(function() {
            if (document.querySelectorAll('.recaptcha-checkbox-checkmark').length > 0) {
                clearInterval(clickCheck);
                document.querySelector('.recaptcha-checkbox-checkmark').click();
            }
        }, 100);