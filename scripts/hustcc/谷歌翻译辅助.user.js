// ==UserScript==
// @name         谷歌翻译辅助
// @version      0.2
// @description  为谷歌翻译输入框中的内容自动删除换行！
// @author       hustcc
// @match        *://translate.google.com/*
// @match        *://translate.google.cn/*
// @connect      translate.google.com
// @grant        unsafeWindow
// @namespace    https://atool.vip/
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.host !== 'translate.google.com' && window.location.host !== 'translate.google.cn') return;

    // 满宽屏！
    const root = document.querySelector('body > div.frame > div.page.tlid-homepage.homepage.translate-text');
    if (root) root.style.maxWidth = '96%';

    let timer = 0;

    function loop() {
        const ele = document.getElementById('source');
        if (ele) {
            const t = ele.value;
            if (t) {
                const r = t.replace(/\n/g, ' ');
                if (r !== t) {
                    ele.value = r;
                }
            }
        }
        // timer
        clearTimeout(timer);
        timer = setTimeout(() => {
            loop();
        }, 1000);
    }

    timer = setTimeout(() => {
        loop();
    }, 1000);
})();