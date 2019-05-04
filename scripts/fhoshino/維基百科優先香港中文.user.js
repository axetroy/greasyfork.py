// ==UserScript==
// @name         維基百科優先香港中文
// @version      0.13-hk
// @description  Wikipedia 維基百科優先香港中文
// @author       Erimus
// @match        https://zh.wikipedia.org/*
// @match        http://zh.wikipedia.org/*
// @grant        none
// @namespace http://erimus.cc/
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var url = window.location.href;
    console.log(url);
    if(url.indexOf("zh.wikipedia.org/wiki") != -1){
        console.log("進入中文頁面");
        url = url.replace("/wiki/","/zh-hk/");
        console.log(url);
        window.location=url;
    }
})();