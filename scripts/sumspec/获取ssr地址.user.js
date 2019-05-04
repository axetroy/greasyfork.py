// ==UserScript==
// @name         获取ssr地址
// @homepage     https://greasyfork.org/zh-CN/scripts/29516-%E8%8E%B7%E5%8F%96ssr-%E5%9C%B0%E5%9D%80
// @namespace    undefined
// @version      1.1
// @description  获取逗比根据地分享的ssr地址
// @author       sumspec
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @include      https://doub.io/sszhfx/*
// @icon         https://doub.io/wp-content/themes/yusi1.0/img/logo.ico
// @run-at       document-end
// @copyright    2017+,sumspec
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $('.pull-right:first').before('<button class="msg_btn action">一键获取</button>');
    $('.msg_btn').click(function(){
        alert('已有新版本，点击确定跳转到更新页面！');
        window.location.href = 'https://greasyfork.org/zh-CN/scripts/33887-getsslink';
    });
})();