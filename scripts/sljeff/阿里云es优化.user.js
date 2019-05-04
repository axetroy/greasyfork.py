// ==UserScript==
// @name         阿里云es优化
// @namespace    https://jeff.wtf/
// @version      0.1
// @description  try to take over the world!
// @author       sljeff
// @match        https://elasticsearch-cn-hangzhou.console.aliyun.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.onload = function () {
        var dom = document.getElementsByClassName('wind-rc-app-layout-content')[0]
        dom.style.overflowY = 'hidden'
    }
})();