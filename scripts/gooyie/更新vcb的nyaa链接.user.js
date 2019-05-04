// ==UserScript==
// @name         更新vcb的nyaa链接
// @namespace    none
// @version      0.1.2
// @description  把vcb上已失效的nyaa链接替换为新的nyaa.si链接
// @author       gooyie
// @license      MIT License
//
// @include      *://vcb-s.com/archives/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const origin = 'https://nyaa.si';

    let links = document.querySelectorAll('a[href*="nyaa"]');
    for (let link of links) {
        if (/nyaa\.(?!si)/.test(link.href)) {
            let u = new URL(link.href);
            let params = [];
            for (let v of u.searchParams.values()) {
                params.push(v);
            }
            let href = origin + '/' + params.join('/');
            console.log('updated %s to %s', link.href, href);
            link.href = link.textContent = href;
        }
    }

})();
