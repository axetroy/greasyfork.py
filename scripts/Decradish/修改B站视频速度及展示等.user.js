// ==UserScript==
// @name         修改B站视频速度及展示等
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Decradish
// @match        https://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var iPlaybackRate = 1.6, //rate
		tmMedia = document.getElementsByTagName("video")[0]; //视频dom

    //默认取消弹幕（是的，我就是不喜欢在弹幕网站里看弹幕）
    var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
    var barrageInterval = setInterval(function(){
        var oBarrageBtn = document.getElementsByClassName('bui-checkbox')[0];
        if(!oBarrageBtn){return false;}

        oBarrageBtn.dispatchEvent(evt);
        clearInterval(barrageInterval);
    }, 100);

    //设置播放速率
    tmMedia.playbackRate = iPlaybackRate;
	tmMedia.onplay = function(){
        console.log('onplay');
		tmMedia.playbackRate = iPlaybackRate;
	};
	tmMedia.oncanplay = function(){
        console.log('oncanplay');
		tmMedia.playbackRate = iPlaybackRate;
	};

    //自动播放
    var evt4Play = document.createEvent('MouseEvents');
        evt4Play.initEvent('click', true, false);
    var playInterval = setInterval(function(){
        var oWidescreenBtn = document.getElementsByClassName('bilibili-player-video-btn-widescreen')[0];
        var oVideoStateBlackside = document.getElementsByClassName('video-state-blackside')[0];
        if(!oVideoStateBlackside){return false;}

        tmMedia.play();
        oWidescreenBtn.dispatchEvent(evt4Play);
        clearInterval(playInterval);
    }, 100);
})();