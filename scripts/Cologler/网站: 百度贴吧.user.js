// ==UserScript==
// @name               Site: tieba.baidu.com
// @name:zh-CN         网站: 百度贴吧
// @namespace          https://github.com/cologler/
// @version            0.1.1.1
// @description        try to add some feature to the site.
// @description:zh-CN  给网站添加一点点小功能。
// @author             cologler (skyoflw@gmail.com)
// @match              https://tieba.baidu.com/p/*
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_registerMenuCommand
// @grant              GM_unregisterMenuCommand
// @noframes
// @license            MIT
// @require            https://cdn.jsdelivr.net/quicksettings/latest/quicksettings.min.js
// @require            https://greasyfork.org/scripts/33447-qs/code/QS.js
// @require            https://greasyfork.org/scripts/33448-gm/code/GM.js
// ==/UserScript==

// this script was hosting on:

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

(function() {
    'use strict';

    (() => { // 只看楼主
        const value = new GM.Value('only-lz', {
            defaultValue: false
        });

        function onChanged() {
            if (value.get()) {
                let url = new URL(location.href);
                if (url.searchParams.get('see_lz') !== '1') {
                    url.searchParams.set('see_lz', '1');
                    location.href = url.href;
                }
            }
        }

        document.addEventListener(QS.EVENT_PANEL_CREATING, e => {
            e.detail.qs.addBoolean('只看楼主', value.get(), e => {
                value.set(e);
            });
        });

        onChanged();
    })();

    (() => { // 高分辨率图片
        const value = new GM.Value('high-res-images', {
            defaultValue: false
        });

        function setSrc(img, src) {
            img.alt = '无法显示，产生关闭高分辨率选项并报告错误。';
            img['raw-src'] = img.src;
            img.src = src;
        }

        function onChanged() {
            if (value.get()) {
                Array.from(document.querySelectorAll('img')).forEach(img => {
                    if (img['raw-src'] !== undefined) {
                        return;
                    }
                    let url = new URL(img.src);
                    if (url) {
                        if (url.host === 'imgsa.baidu.com') {
                            let match = img.src.match(/\/[^\/]+$/);
                            if (match) {
                                setSrc(img, 'https://imgsrc.baidu.com/forum/pic/item' + match[0]);
                            }
                        }
                    }
                });
            }
        }

        document.addEventListener(QS.EVENT_PANEL_CREATING, e => {
            e.detail.qs.addBoolean('高分辨率图片', value.get(), e => {
                value.set(e);
            });
        });

        onChanged();
    })();

    QS.useDefault();
})();