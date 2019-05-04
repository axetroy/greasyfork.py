// ==UserScript==
// @name        优课防止失去焦点
// @qq&wx   1186632641
// @include     *http://www.uooc.net.cn/*
// @version     3.0
// @description 优课支持失去焦点继续播放,播放完成之后弹窗提示
// @grant       none
// @namespace 1186632641
// ==/UserScript==
$(document).ready(function () {
    setInterval(function () {
        var videoButton = document.getElementsByClassName("vjs-big-play-button animated fadeIn")[0];
        if(videoButton !== undefined)
        {
            var video = document.getElementById("player_html5_api");
            video.onended = function() {alert("视频已播放完成");};
            video.muted = true;
            videoButton.click();
        }
    },1000);
});
