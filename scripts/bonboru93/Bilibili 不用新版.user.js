// ==UserScript==
// @name         Bilibili 不用新版
// @version      0.5
// @description  阻止每隔一段时间就强制换成新版
// @author       bonboru93
// @match        http://www.bilibili.com/*
// @match        https://www.bilibili.com/*
// @run-at       document-start
// @namespace https://greasyfork.org/users/208121
// ==/UserScript==

(function() {
    document.cookie = "stardustvideo=-1;path=/;domain=bilibili.com;expires=Sat, 30 Jan 2021 16:00:00 GMT"
    document.cookie = "stardustpgcv=0;path=/;domain=bilibili.com;expires=Sat, 30 Jan 2021 16:00:00 GMT"
})();