// ==UserScript==
// @name 		AcFun样式微调小助手
// @namespace   AcFun
// @description 仅对评论区样式做了紧凑化处理，欢迎提出意见建议
// @include 	http://*.acfun.tv/a/*
// @grant 		none
// @version 	0.0.1.1
// @run-at		document-end
// ==/UserScript==
(function ($) {
  window._doFixA = function () {
    var f = document.createElement('script');
    f.src = 'http://acfun.io/js/styletweak.js?ran=?ran=' + new Date().getTime();
    document.body.appendChild(f);
  }
  window.AC_waitPlayer = function () {
    if (document.getElementById('area-comment-inner') && window.$) {
      clearInterval(AC_waitInt);
      _doFixA();
    }
  }
  AC_waitInt = setInterval('AC_waitPlayer()', 500);
}) (function ($) {
  return document.querySelector($);
});