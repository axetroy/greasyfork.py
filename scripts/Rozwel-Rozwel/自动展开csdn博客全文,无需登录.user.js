// ==UserScript==
// @name         自动展开csdn博客全文,无需登录
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  自动展开csdn博客全文,无需登录.
// @author       RozwelGustab
// @match        http://blog.csdn.net/*/article/details/*
// @match        https://blog.csdn.net/*/article/details/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector('div.article_content').style='';
    var readmore=document.getElementById("btn-readmore").parentNode;
    readmore.parentNode.removeChild(readmore);
})();