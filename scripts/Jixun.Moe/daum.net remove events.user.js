// ==UserScript==
// @name         daum.net remove events
// @namespace    org.jixun
// @version      0.2
// @description  移除右键等限制
// @author       Jixun
// @match        http://cafe.daum.net/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

var s = document.createElement('style');
s.textContent = 'body, body * {-moz-user-focus: initial !important;user-focus: initial !important;-moz-user-input: initial !important;-moz-user-select: initial !important;-webkit-user-select: initial !important;user-select: initial !important;}';
document.head.appendChild(s);

window.addEventListener = null;
window.attachEvent = true;
