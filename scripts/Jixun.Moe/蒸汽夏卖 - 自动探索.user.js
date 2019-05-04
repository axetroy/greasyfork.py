// ==UserScript==
// @name         蒸汽夏卖 - 自动探索
// @namespace    moe.jixun.auto-queue
// @version      1.01
// @description  自动探索下一个项目。
// @author       Jixun.Moe <https://jixun.moe/>
// @include      http://store.steampowered.com/app/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

/* jshint esnext: true */

window.addEventListener('DOMContentLoaded', function() {
    var queue_next = document.getElementsByClassName('next_in_queue_content');
    if (queue_next.length > 0) {
        let time = 10000 + (5000 * Math.random());
        console.info('Wait..');
        setTimeout(function () {
            queue_next[0].click();
        }, time);
    }
}, false);