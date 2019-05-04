// ==UserScript==
// @name         慕课网自动播放下一节视频
// @namespace    https://greasyfork.org/
// @version      1.0
// @date         2018-09-23
// @author       Theliang
// @blog         http://selier.cnblogs.com/
// @description  慕课网 自动播放 下一节 视频
// @license      MIT; https://opensource.org/licenses/MIT
// @match        *://*.imooc.com/*
// @icon         https://www.imooc.com/favicon.ico
// @grant        none
// ==/UserScript==

var nextMask = document.querySelector('div.next-box.J_next-box');

var loop = setInterval(function () {
    if (!nextMask.classList.contains('hide')) {
        //console.log("Click imooc next media");
        //alert("123");
        document.querySelector('div.J-next-btn.next-auto.btn.btn-green').click();
    }
}, 1000);