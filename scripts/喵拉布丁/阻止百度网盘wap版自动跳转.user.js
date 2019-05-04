// ==UserScript==
// @name        阻止百度网盘wap版自动跳转
// @namespace   https://greasyfork.org/users/4514
// @author      喵拉布丁
// @homepage    https://greasyfork.org/scripts/13434
// @description 阻止百度网盘wap版自动跳转到PC版网页（仅限Firefox浏览器有效）
// @include     http://pan.baidu.com/wap/*
// @include     https://pan.baidu.com/wap/*
// @include     http://yun.baidu.com/wap/*
// @include     https://yun.baidu.com/wap/*
// @version     1.3
// @grant       none
// @run-at      document-start
// @license     MIT
// ==/UserScript==
document.addEventListener('beforescriptexecute', function (e) {
    if (e.target.id == 'platform') {
        e.preventDefault();
    }
});