// ==UserScript==
// @name      新浪视频 HTML5
// @description      新浪视频切换为 HTML5 播放器
// @namespace    http://tampermonkey.net/
// @author   狐狸
// @version      0.2
// @include      *://video.sina.com.cn/*
// @include      *://open.sina.com.cn/*
// @include      *://sports.sina.com.cn/*
// @include      *://sports.video.sina.com.cn/*
// @include      *://ent.sina.com.cn/*
// @exclude     http://video.sina.com.cn/l/*
// @grant      none
// @run-at      document-start
// ==/UserScript==

Object.defineProperty(navigator, 'plugins', {
  get: function () {
    return { length: 0 };
  }
});

'use strict';

Object.defineProperty(navigator,"userAgent",{
    value:"Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3",
    writable:false,
    configurable:false,
    enumerable:true
});
