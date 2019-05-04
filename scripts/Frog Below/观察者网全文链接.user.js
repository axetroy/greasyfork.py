// ==UserScript==
// @name         观察者网全文链接
// @namespace    undefined
// @version      0.2
// @description  替换网站里所有连接为直达全文连接，不需要点击阅读全文
// @author       belowfrog
// @match        http*://www.guancha.cn/*
// @grant        none
// ==/UserScript==

/*jshint esversion: 6 */
(function() {
    'use strict';
    const links = document.querySelectorAll('a');
    links.forEach((l) => {
        l.href = l.href.replace(/.shtml$/, '_s.shtml');
    });
})();