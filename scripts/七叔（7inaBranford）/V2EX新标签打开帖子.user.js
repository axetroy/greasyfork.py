// ==UserScript==
// @name         V2EX新标签打开帖子
// @namespace    undefined
// @version      0.77
// @description  让V2EX论坛点击帖子可以打开新标签
// @author       法爷
// @match        *://*.v2ex.com/*
// @grant        none
// ==/UserScript==

(function() {
    document.querySelectorAll('a').forEach(item => {
        if(/^\/t\/\d+/.test(item.pathname)||/^\/member\//.test(item.pathname)) {
            item.setAttribute('target','_blank');
        }
    });
})();