// ==UserScript==
// @name         中证快讯
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  调整网页布局，方便手动复制。
// @author       陈庚
// @match        http://www.cs.com.cn/sylm/jsbd/
// @grant        none
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';
    //$(".list-lm pad10 > li").css("height",150);
    $(".list-lm.pad10").find("li").find("a").each(function(){
        //alert($(this).find("a").attr("href"));
        $(this).after($(this).attr("href")+"</i>");  
        $(this).after("<i>中证快讯</i><i>"+$(this).text()+"</i>");
        
        $(this).remove();
    });
    
})();