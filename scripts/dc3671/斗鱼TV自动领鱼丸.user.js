// ==UserScript==
// @name         斗鱼TV自动领鱼丸
// @namespace    https://greasyfork.org/
// @version      0.1
// @description  实现斗鱼TV自动领鱼丸（需要输入验证码）
// @author       Dash Chen
// @match        https://www.douyu.com/*
// @grant        none
// ==/UserScript==

window.setInterval(function() {
    var time = document.getElementsByClassName('g-time')[0].textContent;
    var node = document.getElementsByClassName('vcode9')[0];
    if (time === '领取' && node === undefined) {
        document.getElementsByClassName('may-btn')[0].click();
    }
}, 1000);
