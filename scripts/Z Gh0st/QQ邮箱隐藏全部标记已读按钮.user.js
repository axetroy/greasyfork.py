// ==UserScript==
// @name         QQ邮箱隐藏全部标记已读按钮
// @namespace    https://zvv.me/
// @version      0.1.1
// @description  经常误按到QQ邮箱的全部标记已读按钮，所以隐藏下。。
// @author       Gh0st
// @match        *mail.qq.com*
// @grant        none
// @include *mail.qq.com*
// ==/UserScript==

(function() {
    'use strict';
    document.getElementsByClassName("btn_gray btn_space")[4].style.display = "none";
    document.getElementsByClassName("btn_gray btn_space")[9].style.display = "none";
    // Your code here...
})();