// ==UserScript==
// @name         Nosub, hover calender tabs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.nosub.tv/
// @grant        none
// @nowrap
// ==/UserScript==
jQuery(function () {
    var $ = jQuery;

    $("#calendar-title li a").mouseenter(function (ev) {
        $(ev.target).trigger("click");
    });
});