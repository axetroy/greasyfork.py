// ==UserScript==
// @name         查找新浪微博图床图片的发布者
// @namespace    http://tampermonkey.net/
// @version      0.5
// @icon         https://www.weibo.com/favicon.ico
// @description  尝试找到新浪微博图床图片的发布者
// @author       You
// @match        *://*.sinaimg.cn/*
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function string62to10(number_code) {
        number_code = String(number_code);
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            radix = chars.length,
            len = number_code.length,
            i = 0,
            origin_number = 0;
        while (i < len) {
            origin_number += Math.pow(radix, i++) * chars.indexOf(number_code.charAt(len - i) || 0);
        }
        return origin_number;
    }
    function decode(url) {
        var lastIndexOfSlash = url.lastIndexOf('/');
        var number = url.substr(lastIndexOfSlash + 1, 8);
        if (number.startsWith('00')) {
            return string62to10(number);
        } else {
            return parseInt(number, 16);
        }
    }
    var desturl = "https://weibo.com/u/" + decode(window.location.href);
    $('body').prepend("<button>查看<br>发布者<br>微博</button>");
    $("button").css({"background-color":"#4CAF50","border":"none","color":"white","border-radius":"12px","position":"fixed","right":"10px","bottom":"10px"});
    $("button").click(function(){
        window.location = desturl;
    });
})();