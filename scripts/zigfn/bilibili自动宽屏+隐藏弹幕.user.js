// ==UserScript==
// @author            zijdn
// @name bilibili自动宽屏+隐藏弹幕
// @description bilibili自动宽屏+隐藏弹幕，自用
// @match https://www.bilibili.com/video/*
// @version 0.1
// @connect-src       www.bilibili.com            
// @namespace https://greasyfork.org/users/234351
// ==/UserScript==


setTimeout(function () {
    $('.bilibili-player-video-btn-widescreen').click();
    document.getElementsByClassName("bui-checkbox")[0].click();
}, 800);
