// ==UserScript==
// @name        Lenovo club force logged
// @name:zh-CN  联想论坛强制登录
// @namespace   http://runapp
// @description Force set logged in on Lenovo club.
// @description:zh-cn GreasyFork规矩真多，就是防止被自动登出的。详见发布页。
// @include     http://club.lenovo.com.cn/*
// @include     https://club.lenovo.com.cn/*
// @version     2
// @grant       unsafeWindow
// @run-at document-start
// ==/UserScript==xxx
Object.defineProperty(unsafeWindow, '_club_login_status', {
  get: function () {
    return true;
  },
  set: function (v) {
  }
});