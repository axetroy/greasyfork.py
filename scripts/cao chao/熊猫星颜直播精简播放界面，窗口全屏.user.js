// ==UserScript==
// @name         熊猫星颜直播精简播放界面，窗口全屏
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  自适应窗口宽度，窗口全屏，自适应宽高
// @author       cH
// @match        https://xingyan.panda.tv/
// @include      *://xingyan.panda.tv/*
// @grant        none
// ==/UserScript==
// @require      http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js
(function() {
    'use strict';
    if(document.getElementById('swfid')){
        var video = jQuery('#swfid');
    jQuery('body').empty();
    jQuery("body").prepend(video);
    setTimeout(function(){
        var video = jQuery('#swfid');
        video.attr('height',$(window).height());
        video.attr('width',jQuery(window).height()*7/9);
        video.css('margin','0 auto');
        video.css('position','absolute');
         video.css('left','-50%');
         video.css('right','-50%');
                         },1000);
    jQuery(window).resize(function(){
        var video = jQuery('#swfid');
        video.attr('height',$(window).height());
        video.attr('width',jQuery(window).height()*7/9);
        console.log(1);
    });
    }
})();