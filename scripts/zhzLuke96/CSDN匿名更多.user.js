// ==UserScript==
// @name         CSDN匿名更多
// @namespace    https://github.com/zhzLuke96/
// @version      0.1
// @description  CSDN越来越恶心了，我不登录咋滴？还不让看？简单实用
// @author       zhzluke96
// @match        https://blog.csdn.net/*/article/details/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $ = q => document.querySelector.call(document,q);
    var $elCSS = (q,csstext) => $(q).style.cssText += csstext;
    $elCSS('.hide-article-box','display:none !important');
    $elCSS('#article_content','height:max-content !important');
})();