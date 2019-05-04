// ==UserScript==
// @name         RobuxChanger by stryer21
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script by stryer21
// @author       You
// @match        https://www.roblox.com/*
// @grant        none
// ==/UserScript==

function start() {
    var robux = document.getElementById("nav-robux-amount");
    robux.innerHTML = "800,000";
      setTimeout(start, 0);
}
start();