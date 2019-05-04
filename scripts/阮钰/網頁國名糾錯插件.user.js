// ==UserScript==
// @name         網頁國名糾錯插件
// @namespace    http://yuy.moe/
// @version      1.0
// @description  糾正錯誤的國家名
// @author       ruanyu
// @include       http://*/*
// @include       https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var html = document.body.innerHTML;
    var replace = [
        /中国台湾/g,
        /台湾省/g,
        /台湾/g,
        /台灣/g,
    ]
    for (let e of replace) {
        html = html.replace(e, '中華民國');
    }
    document.body.innerHTML = html;
})();