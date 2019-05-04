// ==UserScript==
// @name        BILIBILI视频描述中的AV号链接的域名替换及脚本
// @namespace   bilibili_vdesc_exchange
// @description 对于不可解析域名acg.tv的用户，可用此脚本把acg.tv替换成www.bilibili.com/video
// @include     *://*.bilibili.*/video/*
// @version     0.1
// @grant       none
// ==/UserScript==

var v_desc = document.querySelector('#v_desc');
var n_v_desc = v_desc.innerHTML.replace(/http:\/\/acg\.tv/g,'https://www.bilibili.com/video');
v_desc.innerHTML = n_v_desc;