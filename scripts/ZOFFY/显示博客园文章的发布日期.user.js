// ==UserScript==
// @name         显示博客园文章的发布日期
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       zoffy zhang
// @match        http://www.cnblogs.com/*
// @grant        none
// ==/UserScript==

;(function() {
    'use strict'
    var postDate = document.querySelector('#post-date').innerText
    var insertPosition = document.querySelector('.postTitle')
    insertPosition.insertAdjacentHTML('afterend', '<p style="color:#c0392b;font-weight:bold;">发布于 '+postDate+'</p>')
})()
