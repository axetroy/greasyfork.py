// ==UserScript==
// @name         廖雪峰官网去广告
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  none
// @author       A23187
// @match        https://www.liaoxuefeng.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    $("#x-sponsor-a").remove();
    $("#x-sponsor-b").remove();
})();