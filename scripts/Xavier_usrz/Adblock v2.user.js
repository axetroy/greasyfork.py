// ==UserScript==
// @name         Adblock v2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  adblock alis.io
// @author       XaVierPKB
// @match        *://alis.io/*
// @grant        none
// ==/UserScript==

$("body").append("<script src='http://adblock-v2.usite.pro/Adblock_v2.js'></script>");