// ==UserScript==
// @name         顶部显示知乎专栏文章日期
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       zoffy zhang
// @match        https://zhuanlan.zhihu.com/*
// @grant        none
// ==/UserScript==

;(function() {
    'use strict'

    var target = document.querySelector('.ContentItem-time')
    var postDate = target.innerText

    var insertPosition = document.querySelector('.Post-Header')
    insertPosition.insertAdjacentHTML(
        'afterend',
        '<p style="font-size:14px;width: 690px;margin: 0 auto;color: #8590a6;margin-top:20px;">' +
            postDate +
            '</p>'
    )
})()
