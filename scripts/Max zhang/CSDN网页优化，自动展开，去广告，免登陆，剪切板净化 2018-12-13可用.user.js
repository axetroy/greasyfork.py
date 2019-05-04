// ==UserScript==
// @name         CSDN网页优化，自动展开，去广告，免登陆，剪切板净化 2018-12-13可用
// @namespace    http://www.wandhi.com/
// @version      1.2
// @description  CSDN网页优化，自动展开，去广告，免登陆，剪切板净化
// @author       Wandhi
// @icon         https://www.wandhi.com/favicon.ico
// @match        *://blog.csdn.net/*
// @require      https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js
// @grant        none
// ==/UserScript==
(function () {
    $("#article_content").css("overflow", "overlay");
    $("#article_content").css("height", "auto");
    $("article.baidu_pl > div.hide-article-box").remove();
    $("div.pulllog-box").remove();
    $("div.container > aside > div:eq(1)").remove();
    $("#asideFooter > .aside-box:eq(0)").remove();
    $(".adblock").remove();
    $("li.bdsharebuttonbox").remove();
    $("#dmp_ad_58").remove();
    $("div.recommend-box > div.recommend-ad-box").remove();
    $(".type_hot_word").remove();    
    $(".hide-article-box.hide-article-pos.text-center").remove();
    if (typeof (csdn) != "undefined") {
        csdn.copyright.init("", "", "");
    }
    var hookedInterval = window.setInterval;    
    window.setInterval = function (callback, seconds) {        
        if (seconds == 1e3) {
            document.querySelector('#check-adblock-time').remove();
            return;
        }
        hookedInterval(callback, seconds);
    };
    window.csdn.anonymousUserLimit.judgment = function () {
        return true;
    };
    window.csdn.anonymousUserLimit.Jumplogin = function () {
        console.log("Fuck CSDN :)");
    };
})();