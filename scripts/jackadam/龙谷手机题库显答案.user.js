// ==UserScript==
// @name         龙谷手机题库显答案
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.shoujitiku.net/*
// @match        *://10.99.108.43:81/*
// @grant        none
// ==/UserScript==

function display(){
    document.getElementById("stdaan").style.display = "block";
}
var t1 = window.setInterval(display,500);