// ==UserScript==
// @name         Vertix.io
// @namespace    Lexi
// @version      3.0
// @description  Karnage cursor
// @author       Infinite 
// @match        http://vertix.io/*
// @grant        none
// ==/UserScript==

$("html, body").css("cursor","url(http://i.imgur.com/QQCMh1x.png) 34 34, default");

window.oncontextmenu = function () {
   return false;
};