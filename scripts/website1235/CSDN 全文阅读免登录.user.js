// ==UserScript==
// @name         CSDN 全文阅读免登录
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       LiuBing
// @include      https://blog.csdn.net/*/article/details/*
// ==/UserScript==

(function() {
    'use strict';

    var ef =document.getElementsByClassName('hide-article-box text-center')[0]
    if (ef) {
        ef.remove();
        document.getElementById('article_content').style.height = 'auto';
    }
})();