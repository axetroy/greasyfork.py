// ==UserScript==
// @name         维基百科优先简体中文
// @version      0.13
// @description  Wikipedia 维基百科优先简体中文
// @author       Erimus
// @match        *zh.wikipedia.org/*
// @grant        none
// @namespace http://erimus.cc/
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var url = window.location.href;
    console.log(url);
    if(url.indexOf("zh.wikipedia.org/wiki") != -1){
        console.log("进入中文页面");
        url = url.replace("/wiki/","/zh-cn/");
        console.log(url);
        window.location=url;
    }
})();