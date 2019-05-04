// ==UserScript==
// @name         今日头条 - 去广告
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  去除今日头条中广告信息
// @author       hxtgirq710@qq.com
// @match        http*://*.toutiao.com/*
// @require      https://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(function(){
		var selector = ".J_add,.J_qihu_ad,li[ad_show]";
        $(selector).remove();
        setInterval(function(){
            $(selector).remove();
        }, 1000);
    });
})();