// ==UserScript==
// @name         跳过草榴viidii等待时间
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bypass viidii wait time
// @author       You
// @match        *://www.viidii.info/*
// @grant        none
// ==/UserScript==

var timer = setInterval(waitfunction, 0);