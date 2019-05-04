// ==UserScript==
// @name         DefinedCrowd Audio 2x speed
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  ye
// @author       Limit
// @match        https://neevo.definedcrowd.com/en-us/crowd-tasks/task/*
// @grant        none
// ==/UserScript==

var interval = setInterval(() => {
    var e = document.getElementsByTagName('audio');
    for (var i = 0, l = e.length; i < l; i++) {
        e[i].playbackRate = 2;
    }
}, 100);
