// ==UserScript==
// @name        bilibili重定向
// @namespace   https://greasyfork.org/zh-CN/users/821
// @include     http://bangumi.bilibili.com/anime/v/*
// @description B站番组重定向脚本
// @version     3.1
// @author      gfork
// @grant       none
// @run-at      document-end
// ==/UserScript==
var player =document.querySelector('.v-av-link');
window.location=player.href;