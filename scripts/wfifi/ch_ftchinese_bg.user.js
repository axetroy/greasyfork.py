// ==UserScript==
// @name         ch_ftchinese_bg
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  change ftchinese background
// @author       wfifi <wfifi@163.com>
// @match        http://www.ftchinese.com/story/*
// @grant        none
// ==/UserScript==
function chbg(){
    document.body.background = "#000";
}

chbg();