// ==UserScript==
// @name         Youtube播放视频默认2倍速
// @namespace    DsfB2XVPmbThEv39bdxQR2hzid30iMF9
// @version      0.1
// @description  Youtube播放视频默认2倍速，播放视频不用手动选择2倍速了
// @author       tomoya
// @include      http*://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let now = new Date().getTime();
    sessionStorage.setItem('yt-player-playback-rate', JSON.stringify({"data":"2","creation":now}));
})();