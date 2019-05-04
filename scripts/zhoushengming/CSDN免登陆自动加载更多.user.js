// ==UserScript==
// @name         CSDN免登陆自动加载更多
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  不知道啥时候，csdn需要登录才能查看更多，很烦！！！
// @author       xiaoming
// @match        *://blog.csdn.net/*
// @grant        none
// @require      https://cdn.staticfile.org/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $("div.article_content").removeAttr("style");
    $("#btn-readmore").parent().remove();
})();