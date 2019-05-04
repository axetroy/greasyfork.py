// ==UserScript==
// @name         RobuxChanger by anil
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Script by ModderOP
// @author       You
// @match        https://web.roblox.com/home
// @grant        none
// ==/UserScript==

function start() {
    var robux = document.getElementById("nav-robux-amount");
    robux.innerHTML = "8M+";
      setTimeout(start, 0);
}