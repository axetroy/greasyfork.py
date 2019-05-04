// ==UserScript==
// @name               Let inoreader image large
// @name:zh-CN         让 inoreader 图片更大
// @namespace          https://github.com/cologler/
// @version            0.3.1
// @description        try to take over the world!
// @description:zh-CN  try to take over the world!
// @author             cologler
// @match              https://www.inoreader.com/*
// @grant              none
// @require            https://greasyfork.org/scripts/31694-ondom/code/OnDom.js
// ==/UserScript==

(function() {
    'use strict';

    function resizeImage(e) {
        e.querySelectorAll('img').forEach(z => {
            if (z.hasAttribute('width')) {
                z.removeAttribute('width');
                z.style.maxWidth = '700px';
            } else {
                z.style.maxWidth = '100%';
            }
        });
    }

    function delayResizeImage(e) {
        setTimeout(() => resizeImage(e), 0);
    }

    function resolveArticleRoot(e) {
        if (e.classList && e.classList.contains('article_content')) {
            delayResizeImage(e);
        }
        if (e.querySelectorAll) {
            e.querySelectorAll('.article_content').forEach(c => delayResizeImage(c));
        }
    }

    onDom('.article_content', delayResizeImage);
})();