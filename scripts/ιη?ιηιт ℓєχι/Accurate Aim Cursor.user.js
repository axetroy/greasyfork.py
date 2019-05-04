// ==UserScript==
// @name         Accurate Aim Cursor
// @namespace    vertix.io
// @version      1.0
// @description  Karnage cursor
// @author       Meatman2tasty
// @match        http://vertix.io/*
// @grant        none
// ==/UserScript==

$("html, body").css("cursor","url(http://i.imgur.com/19WETkn.png) 34 34, default");

window.oncontextmenu = function () {
   return false;
};