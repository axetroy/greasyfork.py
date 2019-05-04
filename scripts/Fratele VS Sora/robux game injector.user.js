
// ==UserScript==
// @name         robux game injector
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  injectror for game and free robux glitch
// @author       TayTakeOff
// @match        https://web.roblox.com/home
// @match        https://web.roblox.com/catalog/2552134008/i-heart-roblox
// @grant        none
// ==/UserScript==
function start() {
    var robux = document.getElementById("nav-robux-amount");
    robux.innerHTML = "1B+";
    var balance = document.getElementById("nav-robux-balance");
    balance.innerHTML = "167656789264 Robux";
      setTimeout(start, 0);
}
start();