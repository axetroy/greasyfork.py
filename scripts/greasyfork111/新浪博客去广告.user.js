// ==UserScript==
// @name         新浪博客去广告
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  新浪博客去广告，关闭Flash安装提示，博客首页无用模块去除
// @author       laohu
// @match        http://blog.sina.com.cn/
// @match        http://blog.sina.com.cn/s/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

var internalId = null;
var count = 0;
(function() {
    'use strict';
    clearAdvert();

    function clearAdvert() {
        if(document.URL == "http://blog.sina.com.cn/") {
            clearSinaBlogHomeAdvert();
        } else if(document.URL.indexOf("http://blog.sina.com.cn/s/") != -1) {
            internalId = setInterval(function () {
                clearSinaBlogDetailAdvert();
            }, 20);

        }
    }

    function clearSinaBlogHomeAdvert() {
        //去除广告
        $("#ad_05486").remove();
        $(".sinaads-float").remove();
        $(".sinaads").remove();
        $("#nav-hover_ad").remove();
        //去除客户端二维码展示
        $(".side-btns-2w").remove();
        //去除底部聚焦、行业专区、招商模块
        $("#footerzhitouw").remove();
        //去除底部帮助中心模块
        $(".p04").remove();
        //去除滑动到底部时顶部出现的兴趣模块
        $("#feedCardTab").remove();
    }

    function clearSinaBlogDetailAdvert() {
        count++;
        //去除出现的flash插件提示
        var flashDom = $(".CP_w");
        flashDom.remove();
        $(".sinaad-toolkit-box").remove();
        $(".sinaads").remove();
        $(".ntopbar_loading").remove();
        var ramdomVisitDiv = $("#ramdomVisitDiv");
        ramdomVisitDiv.remove();
        if((flashDom && flashDom.length > 0 && internalId && ramdomVisitDiv && ramdomVisitDiv.length > 0) || count >= 250) {
            clearInterval(internalId);
            internalId = null;
        }
        var divs = $("div");
        for(var i = 0; i < divs.length; i++) {
            if(divs[i].children.length == 0) {
                divs[i].remove();
            }
        }
    }
})();