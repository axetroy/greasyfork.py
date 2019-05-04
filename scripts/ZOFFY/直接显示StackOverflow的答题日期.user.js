// ==UserScript==
// @name         直接显示StackOverflow的答题日期
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  directly show the post date of answers at StackOverflow.com
// @author       You
// @match        https://stackoverflow.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict'
    var blocks = document.querySelectorAll('.user-action-time')
    blocks.forEach(function(ele) {
        var relativetime = ele.querySelector('.relativetime')
        var time = new Date(relativetime.title).toLocaleDateString()
        relativetime.innerText = time
    })
})()
