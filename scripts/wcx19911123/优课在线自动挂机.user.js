// ==UserScript==
// @name        优课在线自动挂机
// @namespace   https://osu.ppy.sh/u/376831
// @include     *www.uooconline.com/learn/*
// @version     1.0
// @description 优课在线自动挂机脚本，支持失去焦点继续播放、自动播放下一节
// @grant       none
// ==/UserScript==
$(document).ready(function () {
  setInterval(function () {
    var btn = $('div.btn.btn-danger.next');
    btn.click();
  }, 1000);
});