// ==UserScript==
// @name         隐藏v2ex用户名和头像
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       oliverhuang
// @match        https://*.v2ex.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    document.getElementById('Rightbar').getElementsByTagName('table')[0].style.display='None';
})();