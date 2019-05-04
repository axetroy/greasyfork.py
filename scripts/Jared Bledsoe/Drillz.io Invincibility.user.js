// ==UserScript==
// @name         Drillz.io Invincibility
// @namespace    -
// @version      1
// @description  Places you at random point on map and heals when health is low
// @author       Jared Bledsoe
// @match        *://drillz.io/*
// @grant        none
// ==/UserScript==

setInterval(function() {
	if(Game.players[ME].health<25) {
		socket.emit("nk","me");
    }
},50);

