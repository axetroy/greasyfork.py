// ==UserScript==
// @name              SogouSafeByPass
// @namespace     http://tampermonkey.net/
// @version           1.0
// @description     绕过搜狗浏览器烦人的风险提示！
// @author            kyay006
// @match            http://safe.ie.sogou.com/*
// @grant              none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById("go_to").click();
    // Your code here...
})();