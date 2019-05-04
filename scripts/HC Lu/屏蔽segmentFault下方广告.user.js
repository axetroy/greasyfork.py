// ==UserScript==
// @name         屏蔽segmentFault下方广告
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  屏蔽segmentFault下方出现的广告
// @author       HC
// @match        https://segmentfault.com/*
// @match        *://segmentfault.com/*
// @grant        none
// ==/UserScript==


$(document).ready(function () {
   if(window.location.host.indexOf('segmentfault') !== -1 && $('.widget-register')) {
        $('.widget-register').remove();
   }
});