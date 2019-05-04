// ==UserScript==
// @name         qaru.site fck invert
// @namespace    http://greasyfork.org
// @version      0.01
// @description  Reverse answer text if you have adblock
// @author       HyperKek
// @match        http://qaru.site/questions/*
// @grant        none
// ==/UserScript==

setTimeout(function() { $('.answer-row').children().removeClass(); }, 1000);