// ==UserScript==
// @name               higher resolution images
// @name:zh-CN         更高分辨率图片
// @namespace          https://github.com/cologler/
// @version            0.1
// @description        let resolution of images higher.
// @description:zh-CN  让图片分辨率更高
// @author             cologler
// @match              https://*.imgur.com/
// @grant              GM_addStyle
// ==/UserScript==

// this script was hosting on:

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

(function() {
    'use strict';

    const DOMAINS_MAP = {};

    function register(domin, callback) {
        DOMAINS_MAP[domin] = callback;
    }

    register('imgur.com', () => {
        if (/^https:\/\/[^\.\/]+.imgur.com\/$/.test(location.href)) {
            GM_addStyle(`.album .cover img { object-fit: cover }`);
            document.querySelectorAll('.album .cover img').forEach(z => {
                z.src = z.src.replace('b.jpg', '.jpg');
            });
        }
    });

    let func = DOMAINS_MAP[location.host.match(/[^\.]+\.[^\.]+$/)[0]];
    if (func) {
        func();
    }
})();