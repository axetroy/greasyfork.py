// ==UserScript==
// @name         屏蔽知乎使用adblock后页面顶部出现的横幅
// @namespace    http://tampermonkey.net/
// @version      0.21
// @description  try to take over the world!
// @author       You
// @match        https://www.zhihu.com/*
// @match        http://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/*
// @match        http://zhuanlan.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
var AdblockBanner=document.getElementsByClassName("AdblockBanner")[0];
    AdblockBanner.style.display="none";
    // Your code here...
})();