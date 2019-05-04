// ==UserScript==
// @name         Change rixCloud Logo
// @namespace    https://rixcloud.me/
// @version      0.1
// @include        *://*.rixcloud.*/*
// @include        *://rixcloud.*/*
// @grant        none
// @icon https://rixcloud.me/static/favicon.ico
// @author lisonfan
// @description 修改 rixCloud Logo
// ==/UserScript==

(function() {
    window.onload = function () {
        document.getElementById("logo").style.backgroundImage = "url(https://i.loli.net/2019/03/28/5c9c3f3b597aa.png)";
    }
})();