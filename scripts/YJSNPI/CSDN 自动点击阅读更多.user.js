// ==UserScript==
// @name         CSDN 自动点击阅读更多
// @namespace    http://misakamikoto.example.org/
// @version      0.1
// @description  为什么一定要写 description 还不能和名字一样
// @author       MisakaMikoto
// @match        https://blog.csdn.net/*/article/details/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    try {
        document.getElementById('btn-readmore').click();
        console.log('[ReadMore] Clicked readmore button.');
    } catch (Exception){
        console.log('[ReadMore] Cannot find btn-readmore, use slow mode.');
        var tags = document.getElementsByClassName('btn');
        for (var i = 0; i < tags.length; i++) {
            var now = tags[i];
            if (now.innerHTML == '阅读更多') {
                now.click();
                console.log('[ReadMore] Clicked readmore button.');
                return;
            }
        }
    }
})();