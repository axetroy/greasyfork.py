// ==UserScript==
// @name         百度春晚fuck
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  删除2019年春节期间百度春晚的广告
// @author       xiaoyang
// @match        *://www.baidu.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    $(function () {
        var local_url = location.href;
        if (local_url.indexOf("baidu") > -1) {
            $(".chunwan-wrapper").css("display", "none");
        }
    });

})();