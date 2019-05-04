// ==UserScript==
// @name         腾讯动漫去除左侧推荐
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ac.qq.com/*
// @grant        none
// @require      https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $("#qgirlCanvas").remove();
    $("#recommendStack").remove();
    $("#recommend").remove();
})();