// ==UserScript==
// @name         金投快讯
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  调整网页布局，方便手动复制。
// @author       陈庚
// @match        https://kuaixun.cngold.org/
// @grant        none
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';

    $(".dianzan").remove();
    $("#listTable").find("td.item-news").find(".cont").each(function(){
        //alert($(this).find("a").attr("href"));
        $(this).prepend("<div>金投快讯</div>");
        $(this).append("<div></div><div>"+$(this).find("a").attr("href")+"</div>");
    });
    
})();