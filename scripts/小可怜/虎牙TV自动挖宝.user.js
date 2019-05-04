// ==UserScript==
// @name         虎牙TV自动挖宝
// @namespace    https://greasyfork.org/
// @version      0.1
// @description  实现虎牙TV自动挖宝
// @author       Dash Chen
// @match        http://www.huya.com/*
// @grant        none
// ==/UserScript==

window.setInterval(function() {
    var time = document.getElementsByClassName('btn usable')[0].textContent;
    if (time === '领取') {
        document.getElementsByClassName('btn usable')[0].click();
    }
}, 1000);