// ==UserScript==
// @name         屏蔽微博兴趣页面
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  屏蔽微博兴趣
// @author       isaac
// @match        https://weibo.com/nguide/interests
// @grant        none
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';
    location.href = 'https://weibo.com/'
    // Your code here...
})();