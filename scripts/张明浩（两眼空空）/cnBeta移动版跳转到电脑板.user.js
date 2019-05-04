// ==UserScript==
// @name         cnBeta移动版跳转到电脑板
// @namespace    http://www.zhangminghao.com
// @version      0.4
// @description  从cnbeta的移动版网页跳转到电脑版网页
// @author       张明浩
// @match        http://m.cnbeta.com/view/*
// @match        https://m.cnbeta.com/view/*
// @homepage     https://greasyfork.org/scripts/23158
// @require      http://libs.baidu.com/jquery/2.1.1/jquery.js
// ==/UserScript==

(function() {


    //修改底部链接
    $(".footer_version").empty();
    $(".footer_version").append("<a href='/wap'>文字版</a><a class='cur'>标准版</a><a href='/touch'>触屏版</a>");
    var url = window.location.href;
    var txt1=url.substring(25);
    var txt2 = "<a href='http://www.cnbeta.com/articles"+txt1+"' >电脑端</a>";
    $(".footer_version").append(txt2);

    //修改浮动按钮
    $(".footer_top").empty();
    var txt3 = "<a class='j_backTop gotop' href='http://www.cnbeta.com/articles"+txt1+"' >电脑端</a>";
    $(".footer_top").append(txt3);


})();