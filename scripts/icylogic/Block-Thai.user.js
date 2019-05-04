// ==UserScript==
// @name         Block-Thai
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  block Thai chars
// @author       Zeming Jiang
// @match        http*://www.v2ex.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let replies = document.getElementsByClassName('reply_content');
    for (let reply of replies) {
        reply.innerText = reply.innerText.replace(/[\u0E01-\u0E3A,\u0E3F-\u0E5B]/g,'');
    }
})();