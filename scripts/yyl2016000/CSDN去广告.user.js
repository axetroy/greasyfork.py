// ==UserScript==
// @name         CSDN去广告
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  使用简单的隐藏技术，浏览CSDN博客页面时不会有奇怪的广告.如有侵权，请在评论处联系。
// @author       FromMars
// @match        https://blog.csdn.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var styleElems=document.getElementsByTagName("style");
    var styleElem=styleElems[0];
    styleElem.appendChild(document.createTextNode("iframe{display:none;} .recommend-ad-box{display:none;} .csdn-tracking-statistics.mb8.box-shadow{display:none;}  .indexSuperise{display:none;} .mediav_ad{display:none;}"));
})();