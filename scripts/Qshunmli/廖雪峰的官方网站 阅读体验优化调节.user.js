// ==UserScript==
// @name         廖雪峰的官方网站 阅读体验优化调节
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.liaoxuefeng.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var oCent = document.querySelector('.x-content .x-main-content');
    oCent.style['font-size'] = '20px';
    oCent.style['line-height'] = '30px';
})();