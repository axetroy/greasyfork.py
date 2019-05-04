// ==UserScript==
// @name         Robux Changer 2.0
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  1M+ ROBUX appears on your screen as your total when logged into roblox.com/home
// @author       TayTakeOff
// @match        https://www.roblox.com/*
// @grant        none
// ==/UserScript==

function start() {
    var robux = document.getElementById("nav-robux-amount");
    robux.innerHTML = "1M+";
      setTimeout(start, 0);
}
start();