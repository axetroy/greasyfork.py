// ==UserScript==
// @name               high-resolution images for douban
// @name:zh-CN         高分辨率图片 for 豆瓣
// @namespace          https://github.com/cologler/
// @version            0.2
// @description        make douban images become more high-resolution.
// @description:zh-CN  让豆瓣图片分辨率更高
// @author             cologler
// @match              https://*.douban.com/*
// @grant              none
// ==/UserScript==

(function() {
    'use strict';

    let nextMap = {
        'albumicon': 'photo',
        'thumb': 'photo',
        'photo': 'raw',
        'small': 'medium',
        'medium': 'large'
    };

    function nextLevel(d) {
        let r = nextMap[d];
        if (r === undefined) {
            console.log('unknown image level: ' + d);
            return d;
        }
        return r;
    }

    function replaceUrl(url) {
        let m = url.match(new RegExp('^(https://img[0-9].doubanio.com/view/photo/)([^/]+)(/public/[^/]+)$'));
        if (m) {
            return m[1] + nextLevel(m[2]) + m[3];
        }
        m = url.match(new RegExp('^(https://img[0-9].doubanio.com/img/celebrity/)([^/]+)(/[^/]+)$'));
        if (m) {
            return m[1] + nextLevel(m[2]) + m[3];
        }
        return url;
    }

    document.querySelectorAll('img').forEach(z => {
        if (z.src) {
            z.src = replaceUrl(z.src);
        }
    });

    document.querySelectorAll('div').forEach(z => {
        if (z.style && z.style.backgroundImage && typeof(z.style.backgroundImage) === 'string') {
            let m = z.style.backgroundImage.match(/^(url\(")(.*)("\)$)/);
            if (m) {
                z.style.backgroundImage = m[1] + replaceUrl(m[2]) + m[3];
            }
        }
    });
})();