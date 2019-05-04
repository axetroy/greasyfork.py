// ==UserScript==
// @name         屏蔽动漫之家10秒广告
// @name:zh-CN   屏蔽动漫之家广告
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @description:zh-cn 屏蔽动漫之家10秒广告
// @author       You
// @match        http://m.dmzj.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var ad = document.querySelector('.timeAD');
    var s = document.querySelector('.control_panel.alpha');
    console.log(ad);
    ad.style.display = 'none';
    s.style.display = 'none';
    document.documentElement.style.overflow = 'auto';
    // Your code here...
})();