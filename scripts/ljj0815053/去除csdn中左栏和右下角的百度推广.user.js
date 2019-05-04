// ==UserScript==
// @name         去除csdn中左栏和右下角的百度推广
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  去除csdn中左栏和右下角的百度推广广告
// @author       ljj(920645236@qq.com)
// @match        https://www.baidu.com/s?*
// @match        https://m.baidu.com/*
// @match        https://blog.csdn.net/*
// @match        http://aoyouzi.iteye.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var filter = $("iframe");
    for (var i = 0; i < filter.length; i++) {
        var src = $(filter[i]).attr("src");
        if (src != null && src.indexOf("pos.baidu.com") > 0) {
            filter[i].remove();
            //console.log(i);
            // console.log($(filter[i]).parent().parent());
            // $(filter[i]).parent().parent().remove();
        }
    }


    //删除底部的csnd登陆框框
    //console.log( $(".pulllog-box"));
    $(".pulllog-box").remove();
    // Your code here...
})();