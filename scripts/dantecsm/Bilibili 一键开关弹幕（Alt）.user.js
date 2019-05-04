// ==UserScript==
// @name         Bilibili 一键开关弹幕（Alt）
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  全屏模式下或视频获得焦点时该键有效
// @author       You
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/*
// @run-at       document-end
// ==/UserScript==

(function() {
    document.addEventListener('keydown', e => e.keyCode === 18 && $('.bilibili-player-video-btn-danmaku')[0].click() || $('.bilibili-player-danmaku-setting-lite-panel').hide())
})();