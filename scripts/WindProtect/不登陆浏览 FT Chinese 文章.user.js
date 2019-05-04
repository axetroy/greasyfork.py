// ==UserScript==
// @name         不登陆浏览 FT Chinese 文章 
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  烦死人的登陆提示
// @author       LeiFeng
// @match        http://www.ftchinese.com/story/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function(){
        document.cookie = "viewhistory=0";
    },5000);
})();