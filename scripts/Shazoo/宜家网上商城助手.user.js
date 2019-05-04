// ==UserScript==
// @name         宜家网上商城助手
// @namespace    https://oi.0w0.io
// @icon         https://www.ikea.cn/favicon.ico
// @version      2018-11-2
// @description  给反人类的宜家网上商城加点小功能
// @author       Shazoo
// @match        https://www.ikea.cn/*
// @compatible   chrome
// @compatible   firefox
// @compatible   safari
// @grant        none
// @run-at       document-end
// @license      MIT https://opensource.org/licenses/MIT
// ==/UserScript==



(function() {
    'use strict';

    // Your code here...
    var alist = document.getElementsByTagName('a');
    for (var idx = 0; idx < alist.length; idx++) {
        if (/catalog\/products\//.test(alist[idx].href)){
            alist[idx].target = '_blank';
        }

    }
})();