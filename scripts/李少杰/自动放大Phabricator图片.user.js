// ==UserScript==
// @name         自动放大Phabricator图片
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://codes.growingio.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function autoReplace(e) {
        e.target.value = e.target.value.replace(/\{F(\w+)\}/g, '{F$1, size=full}');
    }
    var tts = document.querySelectorAll('textarea');
    for (var i = 0; i < tts.length; i++) {
        if (tts[i].classList.contains("remarkup-assist-textarea")) {
            tts[i].addEventListener('input', autoReplace);
            console.log('listening', tts[i]);
        }
    }
    // Your code here...
})();