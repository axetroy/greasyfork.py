// ==UserScript==
// @name 破晓去广告
// @namespace mike.poxiao
// @include *://poxiao.com/*
// @include *://www.poxiao.com/*
// @description:zh-cn poxiao.com 上去除第一次点击跳转的广告页面
// @grant none
// @version 0.0.1.20171008083914
// @description poxiao.com 上去除第一次点击跳转的广告页面
// ==/UserScript==

window.onload = function () {
  document.getElementsByTagName("a")[0].remove();
}
document.getElementsByTagName("a")[0].remove();