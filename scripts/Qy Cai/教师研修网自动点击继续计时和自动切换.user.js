// ==UserScript==
// @name         教师研修网自动点击继续计时和自动切换
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  教师研修网，定时检测十分钟停止计时弹窗并点击，定时检测视频是否停止播放并切换当前课程下的下一个视频
// @author       Caiqy
// @icon         http://i.yanxiu.com/favicon.ico
// @match        *://i.yanxiu.com/uft/course/*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    var clockTip = $('.clock-tip')[0];
    var playButton = $('.play-btn-container .btn-body')[0];
    setInterval(function() {
        //检查是否弹出10分钟的提示，有则点击
        if (clockTip && clockTip.style.display === 'block')
            clockTip.click();
        //检查是否播放完毕，完毕则切换下一个视频
        if (playButton && playButton.innerText === '重播') {
            var videos = $('.video');
            var currentVideo = $('.video.click');
            var currentIndex = 0;
            videos.each(function(index, video) {
                if($(video).prop('href') === currentVideo.prop('href')) {
                    currentIndex = index;
                    return false;
                }
            });
            currentIndex++;
            currentIndex = currentIndex < videos.length ? currentIndex : 0;
            videos.eq(currentIndex)[0].click();
        }
    }, 5000);
})();