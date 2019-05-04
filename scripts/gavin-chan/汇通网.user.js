// ==UserScript==
// @name 汇通网
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  调整网页布局，手动复制。
// @author       gavin
// @match        https://kx.fx678.com/
// @grant none
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';

    $(".body_zb").find("li.body_zb_li").find("div.zb_word").find("[href]").each(function(){
        //alert($(this).find("a").attr("href"));
        $(this).prepend("<div>汇通网</div>");
        $(this).append("<div>http://kx.fx678.com"+$(this).attr("href")+"</div>");
        $(this).removeAttr("href");
        //
    });
    
})();