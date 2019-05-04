// ==UserScript==
// @name         Anti kick by [TW]精不 do bloble.io
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  ANTI KICK PORRA.
// @author       [TW]精不
// @match        http://moomoo.io/*
// @grant        none
// ==/UserScript==

setInterval(updatePlayer,90000);
function updatePlayer(){
    socket.emit("2",0,0);
    socket.emit("2",Math.round(camX),Math.round(camY));
}