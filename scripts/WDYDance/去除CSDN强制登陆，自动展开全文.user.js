// ==UserScript==
// @name         去除CSDN强制登陆，自动展开全文
// @namespace    https://www.charlesw.cn/
// @version      0.11
// @description  现在CSDN不登陆都没法用了，这个可以解除3秒跳转
// @author       Chao WANG
// @match        https://blog.csdn.net/*
// @match        http://blog.csdn.net/*
// @grant        none
// ==/UserScript==

(function() {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i);
    }
    $("script[src$='//g.csdnimg.cn/check-adblock/1.1.1/check-adblock.js']").remove();
    $(".adblock").remove();
    $(".check-adblock-bg").remove();
    $("#article_content").css("overflow", "overlay");
    $("#article_content").css("height", "auto");
    $("article.baidu_pl > div.hide-article-box").remove();
    $("div.pulllog-box").remove();
    $("div.container > aside > div:eq(1)").remove();
    $("#asideFooter > .aside-box:eq(0)").remove();
    $("li.bdsharebuttonbox").remove();
    $("#dmp_ad_58").remove();
    $("div.recommend-box > div.recommend-ad-box").remove();
})();