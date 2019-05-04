// ==UserScript==
// @name        Bilibili去除1024
// @namespace   午月
// @description 去除1024论坛 播放在线视频需要安装插件的提示
// @homepageURL https://www.bilibili.com
// @include http://*bilibili*
// @include http://*bilibili*
// @include http://*bilibili*
// @include http://*1024*
// @include http://*bilibili*
// @include http://bilibili.tv
// @include http://*bilibili*
// @exclude http://*bilibili*
// @version     2.0
// @grant       none
// ==/UserScript==

(function (embedList) {
  [
  ].forEach.call(embedList, function (i) {
    var iframe = document.createElement('iframe');
    iframe.src = i.src,
    iframe.width = i.width,
    iframe.height = i.height;
    i.parentNode.replaceChild(iframe, i);
  });
}) (document.querySelectorAll('embed'));