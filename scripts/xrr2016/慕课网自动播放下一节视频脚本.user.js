// ==UserScript==
// @name         慕课网自动播放下一节视频脚本
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  节省体力。
// @author       xrr2016
// @match        *://*.imooc.com/*
// @icon         https://www.imooc.com/favicon.ico
// @grant        none
// ==/UserScript==

var playNextBtn = document.querySelector('div.J-next-btn');

var loop = setInterval(function () {
   if (!playNextBtn.classList.contains('hide')) {
     console.log('end');
     playNextBtn.dispatchEvent(new MouseEvent('click'));
   }
}, 500);