// ==UserScript==
// @name         去除A-COE 2018网站顶部广告
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  去除A-COE 2018网站广告
// @author       Cqdbdong
// @match        https://acoe2018.wixsite.com/*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    $("#WIX_ADS").hide();
    $("header").css("margin-top","0px");
    $("#SITE_ROOT").css("top","0px");
})();