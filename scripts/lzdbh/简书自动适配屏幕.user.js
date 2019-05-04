// ==UserScript==
// @name         简书自动适配屏幕
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  简书文章页按屏幕比例放大
// @author       lzdbh
// @match        https://www.jianshu.com/p/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('.note .post').css({'width':'90%'});
    $('#note-fixed-ad-container,#web-note-ad-1').remove();
})();