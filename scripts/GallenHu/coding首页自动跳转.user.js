// ==UserScript==
// @name         coding首页自动跳转
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  新版 coding 首页自动跳转到个人中心
// @author       You
// @match        https://coding.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var url = window.location.href;
    if (/coding.net\/?$/.test(url))
        window.location.href = 'https://dev.tencent.com/user'
})();
