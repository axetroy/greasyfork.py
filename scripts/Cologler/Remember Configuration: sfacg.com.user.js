// ==UserScript==
// @name               Remember Configuration: sfacg.com
// @namespace          https://github.com/cologler/
// @version            0.1
// @description        keep all configuration for sfacg.com
// @author             cologler (skyoflw@gmail.com)
// @match              http://book.sfacg.com/vip/c/*
// @grant              GM_getValue
// @grant              GM_setValue
// @license            MIT
// ==/UserScript==

// this script was hosting on:

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

(function() {
    'use strict';

    if (window.top !== window) {
        return;
    }

    {
        const KEY = 'auto-order';
        let autoOrder = document.querySelector('#autoOrder');
        if (autoOrder !== null) {
            {
                const state = GM_getValue(KEY, null);
                if (state !== null && autoOrder.checked !== state) {
                    autoOrder.click();
                }
            }
            autoOrder.addEventListener('click', () => {
                GM_setValue(KEY, autoOrder.checked);
            });
        }
    }

})();