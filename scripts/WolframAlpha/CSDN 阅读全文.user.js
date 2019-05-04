// ==UserScript==
// @name         CSDN 阅读全文
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  显示隐藏内容
// @author       Yang
// @match         http://blog.csdn.net/*/article/details/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $('#article_content').css("height","");
    $("div.readall_box").hide();
})();