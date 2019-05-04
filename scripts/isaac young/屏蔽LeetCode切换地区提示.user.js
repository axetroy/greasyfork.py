// ==UserScript==
// @name         屏蔽LeetCode切换地区提示
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  屏蔽LeetCode切换地区提示.
// @author       isaac young
// @match        https://leetcode.com/*
// @grant        none
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';
    var s = document.createElement('style');
    s.innerHTML = '#region_switcher {display: none!important;}';
    document.querySelector('head').appendChild(s);
    // Your code here...
})();