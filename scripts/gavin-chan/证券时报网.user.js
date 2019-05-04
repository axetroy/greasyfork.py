// ==UserScript==
// @name         证券时报网
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  调整网页布局，方便手动复制。
// @author       陈庚
// @match        http://kuaixun.stcn.com/index.shtml
// @grant        none
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';
    $("#news_list2 > li").css("height",150);
    $("#news_list2").find("li").find("a").each(function(){
        //alert($(this).find("a").attr("href"));
        $(this).after("<i>证券时报网</i><i>"+$(this).text()+"</i>");
        $(this).after($(this).attr("href")+"</i>");
        $(this).remove();
    });
    
})();