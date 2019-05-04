// ==UserScript==
// @name         WeBL forum cleaner
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  removes posts of a certain obnoxious manager
// @author       Play to Lose
// @grant        none
// @include      http://webl.vivi.com/cgi-bin/*
// @connect *
// @run-at       document-idle
// ==/UserScript==
(function() {
    'use strict';
var POTATO = "244976";
var links = document.getElementsByTagName("a");
var arrayLength = links.length
for (var i= arrayLength; i-->0;) {
    var element = links[i];
    if (element.href.match(POTATO)) {
        if (element.parentNode.tagName == "P") {
            element.parentNode.innerHTML = "";
        }
        
    }
}
})();