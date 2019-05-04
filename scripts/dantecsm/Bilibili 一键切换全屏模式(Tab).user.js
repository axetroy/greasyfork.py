// ==UserScript==
// @name         Bilibili 一键切换全屏模式(Tab)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  除宽屏外，增加网页全屏和可输入弹幕的网页全屏模式
// @author       You
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    let playerMode = 0
    document.addEventListener('keydown', e => e.keyCode === 9 && player.mode(playerMode = (playerMode + 1) % 4))
})();