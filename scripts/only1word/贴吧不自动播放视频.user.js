// ==UserScript==
// @name         贴吧不自动播放视频
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  百度贴吧不自动播放视频。
// @author       only1word
// @include     /http(?:s|)://(?:tieba\.baidu\.com|.+\.tieba\.com)//
// @run-at      document-idle
// @grant        none
// ==/UserScript==

window.localStorage.videoOpenAutoPlay = 0;