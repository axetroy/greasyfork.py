// ==UserScript==
// @name         DubX
// @namespace    dubx.net
// @description  Autorun DubX on dubtrack.fm
// @author       mbsurfer
// @match        *://*.dubtrack.fm/*
// @grant        none
// @run-at       document-start
// @version      1.0
// ==/UserScript==

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        $.getScript('https://rawgit.com/sinfulBA/DubX-Script/master/beta.js');
    }
}, 500);