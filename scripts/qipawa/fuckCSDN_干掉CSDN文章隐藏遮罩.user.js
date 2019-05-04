// ==UserScript==
// @name         fuckCSDN_干掉CSDN文章隐藏遮罩
// @namespace    fuckit
// @version      0.2.7
// @description  fuck CSDN, 干掉CSDN文章隐藏遮罩
// @author       Jack.Chan
// @match        *://blog.csdn.net/*/article/details/*
// @run-at       document-end
// @home-url     https://greasyfork.org/zh-CN/scripts/374937-csdn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');
    style.id = 'fucking-style';
    //style.innerHTML+= '.container{max-width:1200px !important}';
    //style.innerHTML+= '.container main{max-width:900px !important}';
    style.innerHTML = '#article_content{height:auto !important;overflow:visible !important;}';
    style.innerHTML+= 'main div.blog-content-box article div.hide-article-box{position:static !important}';
    style.innerHTML+= 'body .hide-article-pos{position:static !important;}';
    //style.innerHTML+= '.recommend-right, .recommend-box{display:none !important}';
    document.head.appendChild(style);
})();