// ==UserScript==
// @name         手机查看网页源码
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.msn.com/spartan/ntp?locale=zh-Hans-CN&market=CN&enableregulatorypsm=0
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.open('view-source:'+window.location.href);
    // Your code here...
})();