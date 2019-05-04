// ==UserScript==
// @name         知乎专栏时间放上面
// @namespace    zhangolve@gmail.com
// @version      0.01
// @description  把知乎专栏文章的更新时间放上面
// @author       zhangolve
// @match        *://zhuanlan.zhihu.com/*
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
   window.onload= function() {
   var a = document.querySelector('.ContentItem-time')
   var b = document.querySelector('.Post-Header')
   b.appendChild(a);
   }
    // Your code here...
})();