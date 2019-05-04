// ==UserScript==
// @name         NGA新标签打开帖子
// @namespace    undefined
// @version      0.7
// @description  让NGA论坛点击帖子可以打开新标签
// @author       法爷
// @match        *://*.ngacn.cc/*
// @match        *://*.nga.cn/*
// @grant        none
// ==/UserScript==

(function() {
    document.querySelectorAll('a.topic').forEach(item => item.setAttribute('target','_blank'));
})();