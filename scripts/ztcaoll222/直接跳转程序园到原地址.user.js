// ==UserScript==
// @name         直接跳转程序园到原地址
// @namespace    http://www.voidcn.com
// @version      0.1
// @description  try to take over the world!
// @author       ztcaoll222
// @match        http://www.voidcn.com/*
// @grant        none
// ==/UserScript==

(function() {
    var originfo = document.getElementById("originfo");
    var targetUrl = originfo.text;
    location.href = targetUrl;
})();
