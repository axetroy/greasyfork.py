// ==UserScript==
// @name         Robux Changer 3.0
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Robux appears on your screen as your total when logged into roblox.com/home
// @author       ppbopo
// @match        https://web.roblox.com/home
// @grant        none
// ==/UserScript==

function start() {
    var robux = document.getElementById("nav-robux-amount");
    robux.innerHTML = "9M+";
    var balance = document.getElementById("nav-robux-balance");
    balance.innerHTML = "9,999,999 Robux";
      setTimeout(start, 0);
}
start();