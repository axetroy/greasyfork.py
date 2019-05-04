// ==UserScript==
// @name         防江苏电信HTTP广告劫持
// @namespace    http://github.com/wormful
// @description  简单粗暴的方法，检测到电信的iframe广告即刷新页面
// @version      0.2
// @author       Yilin Chen
// @include        http://*
// @require      http://cdn.staticfile.org/zepto/1.1.4/zepto.min.js
// @grant        none
// ==/UserScript==

$("body").bind("DOMSubtreeModified", function() {
    arr = $("iframe");
    for(var i = 0; i < arr.length; i++) {
        var src = $(arr[i]).attr("src");
        if(src && src.indexOf("//221") >= 0) {
            location.reload();
        }
    }
});