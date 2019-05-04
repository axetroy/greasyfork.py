// ==UserScript==
// @name:zh-CN   开发者头条自动跳转
// @name         toutiao jumper
// @namespace    http://gavinwork.space/
// @version      0.4
// @description:zh-cn  直接从头条上跳转到目的网站
// @description  jump direct to dest websites on toutiao.io
// @author       Gavin
// @include     http*://toutiao.io/posts/*
// @exclude     http*://toutiao.io/posts/hot/*
// @run-at      document-start
// @grant        none
// ==/UserScript==

var debug = true;

var loc = window.location.href;
var jump_loc = loc.replace(/posts/,'j');
if (debug) {
    console.log("origin url=", loc);
    console.log("jump url=", jump_loc);
}
window.location.href = jump_loc;