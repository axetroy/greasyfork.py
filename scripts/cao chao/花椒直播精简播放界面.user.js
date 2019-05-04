// ==UserScript==
// @name         花椒直播精简播放界面
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  自适应窗口宽度
// @author       cH
// @match        http://www.huajiao.com/
// @include      *://*huajiao.com/l/*
// @include      *://*huajiao.com/v/*
// @grant        none
// ==/UserScript==
// @require      http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js
(function() {
    'use strict';
    var video = $('#player');
    video.attr('height',$(window).height());
    $('body').css('min-width','0px');
    $('body').empty();
    $("body").prepend(video);
    $(window).resize(function(){
        video.attr('height',$(window).height());
    });
})();