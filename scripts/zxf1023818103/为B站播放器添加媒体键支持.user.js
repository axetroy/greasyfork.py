// ==UserScript==
// @name         为B站播放器添加媒体键支持
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  通过添加键盘监听事件为播放器启用键盘媒体键控制，仅对H5播放器有效。
// @author       Zeng Xiangfei
// @supportURL   https://github.com/zxf1023818103/bilibili-media-control-key/issues
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @compatible   safari
// @license      MIT
// @include      *://www.bilibili.com/video/av*
// @include      *://www.bilibili.com/bangumi/play/ep*
// @include      *://www.bilibili.com/bangumi/play/ss*
// @include      *://m.bilibili.com/bangumi/play/ep*
// @include      *://m.bilibili.com/bangumi/play/ss*
// @include      *://bangumi.bilibili.com/anime/*
// @include      *://bangumi.bilibili.com/movie/*
// @include      *://www.bilibili.com/bangumi/media/md*
// @include      *://www.bilibili.com/blackboard/html5player.html*
// @run-at       document-start
// @grant        none
// ==/UserScript==

'use strict';
(function () {
    window.onkeydown = function (event) {
        switch (event.key) {
            case "MediaPlayPause":
                if (player.getState() === "PAUSED") {
                    player.play();
                }
                else {
                    player.pause();
                }
                break;
            case "MediaTrackPrevious":
                player.prev();
                break;
            case "MediaTrackNext":
                player.next();
                break;
            default:
                break;
        }
    };
})();