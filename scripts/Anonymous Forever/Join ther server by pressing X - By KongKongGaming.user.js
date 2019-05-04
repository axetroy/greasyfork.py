// ==UserScript==
// @name         Join ther server by pressing X - By KongKongGaming
// @namespace    namespace
// @version      2.0
// @description  Join ther server by pressing X
// @author       KongKongGaming
// @match        http://vertix.io/*
// @grant        none
// ==/UserScript==

document.addEventListener("keydown", function(a) { // Press '=' to respawn
    if (a.keyCode == 88) {
startGame("player");
socket.emit("respawn");
    }
}, false);