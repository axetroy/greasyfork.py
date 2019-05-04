// ==UserScript==
// @name         Vertix server join
// @namespace    namespace
// @version      1.0
// @description  Prss space to enter
// @author       Stranger3003
// @match        http://vertix.io/*
// @grant        none
// ==/UserScript==

document.addEventListener("keydown", function(a) { // Press '=' to respawn
    if (a.keyCode == 32) {
startGame("player");
socket.emit("respawn");
    }
}, false);