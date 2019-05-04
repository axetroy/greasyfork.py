// ==UserScript==
// @name         斗鱼最大字符
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  增大斗鱼弹幕输入框的最大字符限制，后果未知，谨慎使用。
// @author       Glaucus
// @match        *://*.douyu.com/*
// @require      https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    //长度设置为100，可自行修改
    setInterval(function() {
        $('textarea').attr("maxlength","100");
    },200);
})();