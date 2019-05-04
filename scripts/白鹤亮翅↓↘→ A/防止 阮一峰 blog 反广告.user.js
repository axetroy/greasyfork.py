// ==UserScript==
// @name         防止 阮一峰 blog 反广告
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  防止 阮一峰 博客屏蔽adblock
// @author       You
// @match        http://www.ruanyifeng.com/*
// @grant        none
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    // console.info('Hello Tampermonkey');

    var img = document.createElement('img');
    img.setAttribute('src', 'http://www.ruanyifeng.com/blog/images');
    img.width = 0;
    img.height = 0;
    document.body.insertBefore(img, document.body.firstChild);

})();