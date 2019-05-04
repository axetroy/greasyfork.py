// ==UserScript==
// @name         SegmentFault回答页面自动加载评论
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Cooper
// @match        *://*.segmentfault.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
    setTimeout(() => {
        document.querySelectorAll(".comments").forEach(function (item) {
            item.click()
        })
        document.body.scrollTop = 0;
    }, 0);
})();