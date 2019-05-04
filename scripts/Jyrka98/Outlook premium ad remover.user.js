// ==UserScript==
// @name         Outlook premium ad remover
// @namespace    jyrka98_script
// @version      0.3
// @description  Removes the "Buy Office 365 with premium Outlook features" ad
// @author       Jyrka98
// @match        https://outlook.live.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.remove_data = { removed: false, interval: null };
    window.remove_data.interval = setInterval(function() {
        var el = document.querySelector("._20YsfelFmugQWgNkXdkYaF");
        if (!el) {
            if (!window.remove_data.removed) {
                return;
            }
            clearInterval(window.remove_data.interval);
            console.log('cleared interval');
            return;
        }
        el.remove();
        window.remove_data.removed = true;
    }, 1500);
})();