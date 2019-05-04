// ==UserScript==
// @name         禁止Web版微信延迟加载图片
// @description  在Web版微信文章页面中直接显示图片
// @namespace    https://greasyfork.org/zh-CN/scripts/disable_lazy_load
// @version      0.1
// @author       reinstallsys
// @match        http://mp.weixin.qq.com/s?*
// @match        https://mp.weixin.qq.com/s?*
// @match        https://mp.weixin.qq.com/s?*
// @match        http://mp.weixin.qq.com/s/*
// @match        https://mp.weixin.qq.com/s/*
// @run-at       document-start
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

var $ = window.jQuery;

$(document).ready(function() {
    setTimeout(function(){
        $('img').each(function(){
            var dataSrc = $(this).attr('data-src');
            if (dataSrc){
                $(this).attr('src', dataSrc);
                $(this).removeAttr('data-src');
            }
        });
    }, 1000);
});