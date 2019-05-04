// ==UserScript==
// @name               Remember Configuration: huya.com
// @namespace          https://github.com/cologler/
// @version            0.1.2
// @description        keep all configuration for huya.com
// @author             cologler
// @match              http://www.huya.com/*
// @grant              GM_getValue
// @grant              GM_setValue
// @require            https://greasyfork.org/scripts/31694-ondom/code/OnDom.js
// ==/UserScript==

// this script was hosting on: https://gist.github.com/Cologler/602d8deabe329ba7bb9a520633064f57

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

(function() {
    'use strict';

    if (window.top !== window) {
        return;
    }

    (() => {
        const KEY = 'disable-danmu';
        const CLASS_NAME = 'danmu-hide-btn';
        onceDom('#player-danmu-btn', btn => {
            let state = GM_getValue(KEY, null);
            function listen() {
                btn.addEventListener('click', () => {
                    setTimeout(() => GM_setValue(KEY, btn.classList.contains(CLASS_NAME)));
                });
            }
            setTimeout(() => {
                (() => {
                    if (state !== null) {
                        if (btn.classList.contains(CLASS_NAME) !== state) {
                            btn.click();
                            listen();
                            return;
                        }
                    }
                    listen();
                })();
            }, 3000); // who know when it binding...
        });
    })();

})();