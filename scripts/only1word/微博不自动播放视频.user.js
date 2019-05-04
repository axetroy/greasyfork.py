// ==UserScript==
// @name         微博不自动播放视频
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  微博不自动播放视频。
// @author       only1word
// @include     /http(s|):\/\/([^.]+\.|)weibo\.com/
// @run-at      document-idle
// ==/UserScript==

$CONFIG.isAuto = 1
Object.freeze($CONFIG)