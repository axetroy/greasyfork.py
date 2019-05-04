// ==UserScript==
// @name         电脑上查看微信文章时直接下载所有图片
// @version      0.6
// @description  Preload Images for WeChat
// @namespace    shoaly
// @author       shoaly
// @match        http://mp.weixin.qq.com/s?*
// @match        https://mp.weixin.qq.com/s?*
// @match        https://mp.weixin.qq.com/s?*
// @match        http://mp.weixin.qq.com/s/*
// @grant        GM_addStyle
// @run-at       document-start
// @require     https://cdn.bootcss.com/jquery/2.1.4/jquery.js
// ==/UserScript==


GM_addStyle('img{width:100% !important;height:auto !important}');

(function($) {
    'use strict';
    $(function(){
        $('img').each(function(){
        var dataSrc = $(this).attr('data-src');
        
        if (dataSrc){
            $(this).attr('src', dataSrc);
            $(this).attr('_src', dataSrc);
            $(this).removeAttr('data-src');
            
        }
    });
    
    });
})(jQuery.noConflict(true));


