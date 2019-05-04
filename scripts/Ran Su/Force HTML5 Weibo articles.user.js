// ==UserScript==
// @name         Force HTML5 Weibo articles
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://weibo.com/ttarticle/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var url = window.location.toString();
    window.location = url.replace('https://weibo.com/ttarticle/p/show?', 'https://media.weibo.cn/article?');
})();