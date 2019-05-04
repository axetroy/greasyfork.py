// ==UserScript==
// @name         阳光宽频网自动跳转至西瓜视频
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  阳光视频网自动跳转至西瓜视频
// @author       hunao.me
// @match        *.365yg.com/*
// @grant        none
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';
    var temp_href = window.location.href;
    window.location.href=temp_href.replace("365yg","ixigua");
})();