// ==UserScript==
// @name               Remember Configuration: iqing.in
// @namespace          https://github.com/cologler/
// @version            0.1
// @description        keep all configuration for iqing.in
// @author             cologler (skyoflw@gmail.com)
// @match              https://www.iqing.in/read/*
// @grant              GM_getValue
// @grant              GM_setValue
// @require            https://greasyfork.org/scripts/31694-ondom/code/OnDom.js
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
        const callback = e => {
            GM_setValue(KEY, e.target.checked);
        };
        let lastBtn = null;
        onDom('#ipt-atpay-book', btn => {
            if (lastBtn) {
                lastBtn.removeEventListener('click', callback);
                lastBtn = null;
            }
            {
                const state = GM_getValue(KEY, null);
                if (state !== null && btn.checked !== state) {
                    btn.click();
                }
            }
            btn.addEventListener('click', callback);
        });
    }

})();