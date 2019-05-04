// ==UserScript==
// @name         A岛黎明版图片重定向至原图
// @namespace    zhihaofans
// @version      0.0.4
// @description  仅适合A岛黎明版、备胎岛
// @author       zhihaofans
// @match        https://adnmb.com/t/*
// @match        https://adnmb.com/f/*
// @match        https://adnmb1.com/t/*
// @match        https://adnmb1.com/f/*
// @match        https://adnmb2.com/t/*
// @match        https://adnmb2.com/f/*
// @match        https://tnmb.org/t/*
// @match        https://tnmb.org/f/*
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        Apache-2.0
// ==/UserScript==
(function () {
    jQuery.noConflict();
    function tnmb(){
        var links= jQuery("a.h-threads-img-tool-btn");
        for (var a = 0; a < links.length; a++){
            var link_a = jQuery(links.get(a));
            link_a.attr("href", link_a.attr("href").replace("http://", "https://"));
        }
        var imgs = jQuery("a.h-threads-img-a");
        for (var b = 0; b < imgs.length; b++) {
            var link_b = jQuery(imgs.get(b));
            console.log(link_b);
            link_b.attr("href", link_b.attr("href").replace("http://", "https://"));
            var img = link_b.find("img.h-threads-img");
            var imageFullUrl = img.attr("data-src").replace("http://", "https://").replace("https://tnmbstatic.fastmirror.org/Public/Upload/thumb/","https://tnmbstatic.fastmirror.org/Public/Upload/image/");
            img.attr("data-src", imageFullUrl);
            img.attr("src", imageFullUrl);
        }
    }
    function adnmb(){
        var tImage=jQuery("div.h-forum-header > p > img");
        tImage.attr("src", link_a.attr("src").replace("http://", "https://"));
        var links= jQuery("a.h-threads-img-tool-btn");
        for (var a = 0; a < links.length; a++){
            var link_a = jQuery(links.get(a));
            link_a.attr("href", link_a.attr("href").replace("http://", "https://"));
        }
        var imgs = jQuery("a.h-threads-img-a");
        console.log(imgs.length);
        for (var b = 0; b < imgs.length; b++) {
            var link_b = jQuery(imgs.get(b));
            console.log(link_b);
            link_b.attr("href", link_b.attr("href").replace("http://", "https://"));
            var img = link_b.find("img.h-threads-img");
            var imageFullUrl = img.attr("data-src").replace("http://", "https://").replace("https://nmbimg.fastmirror.org/thumb/", "https://nmbimg.fastmirror.org/image/");
            img.attr("data-src", imageFullUrl);
            img.attr("src", imageFullUrl);
        }
    }
    jQuery(document).ready(function () {
        switch(window.location.origin){
            case "https://adnmb.com":
            case "https://adnmb1.com":
            case "https://adnmb2.com":
                adnmb();
                break;
            case "https://tnmb.org":
                tnmb();
                break;
        }
    });
})();
