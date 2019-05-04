// ==UserScript==
// @name         DMZJ 修复上下滚动浏览
// @namespace    https://unlucky.ninja/
// @version      0.1
// @description  修复DMZJ上下滚动浏览图片加载失败问题
// @author       UnluckyNinja
// @match        http*://manhua.dmzj.com/*
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function($, window) {
    'use strict';

    // DMZJ 错把app_html打成了app_heml,还好引用的全局作用域，直接这里写个就好
    window.app_html = '<div id="app_manhua" style="width:800px; height:120px; padding:20px; background:#fff; display:block; border:1px solid #ccc; margin:20px auto"></div>'
}).call(unsafeWindow || window, (unsafeWindow || window).$, unsafeWindow || window);