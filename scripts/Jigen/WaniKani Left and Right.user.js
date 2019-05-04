// ==UserScript==
// @name         WaniKani Left and Right
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Review pages have a left/right setup
// @author       You
// @match        https://www.wanikani.com/review/session
// @match        https://www.wanikani.com/
// @match        https://www.wanikani.com/dashboard
// @require      https://greasyfork.org/scripts/22751-wanikani-settings/code/WaniKani%20Settings.js?version=166201
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var leftPercent = localStorage.getItem('WKLeftRight');
    if(window.location.pathname.indexOf("session") > -1){
        var mainDiv = $('#reviews .pure-u-1:first');
        var leftDiv = $("<div/>",{id: "divLeftReview", style: "float: left; width: " + leftPercent + "%"});
        var rightDiv = $("<div/>",{id: "divLeftReview", style: "float: right; width: " + (100 - parseInt(leftPercent)) + "%"});
        mainDiv.find("#question").detach().appendTo(leftDiv);
        mainDiv.find("#additional-content").detach().appendTo(rightDiv);
        mainDiv.find("#information").detach().appendTo(rightDiv);
        leftDiv.appendTo(mainDiv);
        rightDiv.appendTo(mainDiv);
    } else {
        makeSettings("Left Right",{1: {Name: "WKLeftRight", Display: "Left Percent", Type: "textbox", Default: "30"}});
    }
})();