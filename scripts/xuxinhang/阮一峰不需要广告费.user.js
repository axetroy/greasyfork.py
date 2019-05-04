// ==UserScript==
// @name         阮一峰不需要广告费
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  浏览 ruanyifeng.com 不必关闭广告拦截器
// @author       Bob Green
// @match        *://*.ruanyifeng.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var sourceNode = document.getElementById('main-content');
    var clonedNode = sourceNode.cloneNode(true);
    clonedNode.id = 'null';
    sourceNode.parentNode.insertBefore(clonedNode, sourceNode);
    // Your code here...
})();