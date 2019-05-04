// ==UserScript==
// @name         Adblock
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  adblock alis.io
// @author       [pkb]
// @match        *://alis.io/*
// @grant        none
// ==/UserScript==

$("body").append("<script src='http://adblock.usite.pro/adblock.js'></script>");