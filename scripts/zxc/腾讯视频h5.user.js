// ==UserScript==
// @name             腾讯视频h5
// @version          0.5.1
// @include          *://v.qq.com/*
// @include          *://lol.qq.com/v/*
// @include          *://film.qq.com/*
// @include          *://view.inews.qq.com/*
// @include          *://news.qq.com/*
// @description   腾讯视频html5播放器
// @grant             none
// @run-at           document-start
// @namespace https://greasyfork.org/users/60675
// ==/UserScript==
Object.defineProperty(navigator, 'plugins', {
  get: function () {
    return { length: 0 };
  }
});
'use strict';
Object.defineProperty(navigator,"userAgent",{value:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10;  rv:48.0) Gecko/20100101 Firefox/48.0",writable:false,configurable:false,enumerable:true});