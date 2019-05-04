// ==UserScript==
// @name         中国证券网
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  调整网页布局，方便手动复制。
// @author       陈庚
// @match        http://news.cnstock.com/bwsd/*
// @grant        none
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';
    
    $("div.left-side").find("ul.nf-list").find("p.des").each(function(){
        //alert($(this).find("a").attr("href"));
        $(this).prepend("<div>中国证券网</div>");
        $(this).append("<div></div><div>"+$(this).find("a").attr("href")+"</div>");
    });
    
})();