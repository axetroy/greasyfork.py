// ==UserScript==
// @name         [GO]ITALIA 
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  ANTI KICK PORRA.
// @author       IMPERATOR/ITALIA
// @match        http://moomoo.io/*
// @grant        none
// ==/UserScript==

setInterval(updatePlayer,90000);
function updatePlayer(){
    socket.emit("2",0,0);
    socket.emit("2",Math.round(camX),Math.round(camY));
}