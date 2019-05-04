// ==UserScript==
// @name         极客学院课程学习播放下载
// @namespace    http://ekozhan.com/
// @version      0.1.3
// @description  极客学院每个视频播放时都需要手动调整为1.5x倍速播放，这里优化为自动调整，增加下载视频按钮
// @author       eko.zhan
// @match        https://www.jikexueyuan.com/course/*
// @grant        unsafeWindow
// @license      MIT
// @icon         http://wiki.jikexueyuan.com/assets/favicon.ico
// ==/UserScript==

(function() {
    'use strict';

    window.setTimeout(function(){
        $('.speedBtn>ul>li:eq(2)').click();$('.speedBtn>ul').hide();
        if ($('.lianbo .ysc').length==0) $('.lianbo i').click();
        var _videoUrl = $('video')[0].currentSrc;
        var _title = $('#palyer-box .tit').text();
        $('#palyer-box h1').append('<span><a href="' + _videoUrl + '" download="' + _title + '" target="_blank" style="color: #35b558;font-size:14px;">单击下载视频</a></span>');
        $(window).scrollTop(120);
    }, 3000);
})();