// ==UserScript==
// @name         Clean Weibo
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  清理微博，个人主页，清理完记得删除此脚本
// @author       You
// @match        https://www.weibo.com/p/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(() => {
        document.querySelector('a[action-type="feed_list_delete"]').click()
        document.querySelector('a[action-type="ok"]').click()
    }, 1000)
})();