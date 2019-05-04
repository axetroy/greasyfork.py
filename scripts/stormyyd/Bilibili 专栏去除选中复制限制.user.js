// ==UserScript==
// @name         Bilibili 专栏去除选中复制限制
// @namespace    https://github.com/stormyyd/
// @version      0.0.2
// @description  去除 Bilibili 专栏中的选中及复制限制
// @author       stormyyd
// @match        *://www.bilibili.com/read/*
// @license      Do What The F*ck You Want To Public License
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict'

    function copyToClipboard() {
        let str = window.getSelection().toString()
        GM_setClipboard(str)
    }

    let article = document.getElementsByClassName("article-holder")[0]
    article.classList.remove("unable-reprint")
    article.addEventListener("copy", copyToClipboard)
})();
