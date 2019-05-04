// ==UserScript==
// @name         New Mouse Aim Cursor
// @namespace    Lexi
// @version      1.9
// @description  vertix cursor
// @author       Infinite 
// @match        http://vertix.io/*
// @grant        none
// ==/UserScript==

$("html, body").css("cursor","url(http://i.imgur.com/QQCMh1x.png) 34 34, default");

window.oncontextmenu = function () {
   return false;
};