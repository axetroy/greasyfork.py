// ==UserScript==
// @name         v2ex toolbox
// @namespace    https://greasyfork.org/zh-CN/users/239647-lenville
// @version      0.1.6
// @description  隐藏没头像用户的Feeds&手动屏蔽用户
// @author       Lenville
// @match        https://www.v2ex.com/*
// @grant        none
// @esversion    6
// ==/UserScript==

/* jshint esversion: 6 */
(function() {
    'use strict'

    // 隐藏没头像用户的Feeds
    var list = document.querySelectorAll('.box .cell.item')
    list.forEach(o => /d=retro/.test(o.querySelector('img').src) && (o.hidden = true))

    var blockedUsers = [
        'briefcopy',
        'zmqking',
        'KasonPasser',
        'ls1164917500',
        'YiChen233',
    ]

    var list2 = document.querySelectorAll('.topic_info')
    list2.forEach(o => blockedUsers.include(o.querySelector('strong a').innerHTML) && (o.hidden = true))
})();