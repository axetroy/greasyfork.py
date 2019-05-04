// ==UserScript==
// @name         百科自用
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  让百度不再装逼
// @author       You
// @match        *://baike.baidu.com/item/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $('div.side-content').remove();
    $('div.main-content').css('width', 'auto');
})();