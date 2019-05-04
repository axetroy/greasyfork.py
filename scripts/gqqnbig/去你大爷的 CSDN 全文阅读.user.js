// ==UserScript==
// @name         去你大爷的 CSDN 全文阅读
// @namespace    https://gqqnbig.me
// @version      0.1
// @description  把阅读更多的那个啥玩意儿给干掉
// @author       laobubu, gqqnbig
// @match        http://blog.csdn.net/*/article/details/*
// @match        https://blog.csdn.net/*/article/details/*
// @grant        none
// @license      LGPL-3.0-only
// ==/UserScript==

(function() {
    'use strict';

    var ef = document.querySelector('.hide-article-box');
    if (ef) {
        ef.remove();
        //document.querySelector('#article_content').style.height='auto';
    }
})();
