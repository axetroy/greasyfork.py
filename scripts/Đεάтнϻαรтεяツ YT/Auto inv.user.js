// ==UserScript==
// @name         Auto inv
// @namespace    try take over :D
// @version      2.0.9
// @description  try to take over the world!
// @author       Death
// @match        *https://gota.io/web/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();function checkmessage(event) {
	var elem = this.lastChild;
	var canvas = elem.getElementsByTagName("canvas")[0];
	if (canvas !== undefined) {
		var playerid = canvas.getAttribute("data-player-id");
		var limit = document.getElementById("party-canvas").height;
		if (limit != 205) {
			console.log('Send invite to player - ' + playerid);
			player.sendPacket(new Packet.sendPartyAction(0, playerid));
		}
	}
}

var input = document.createElement("input");
input.className = "gota-btn";
input.type = "button";
input.value = "start auto invite";
input.id = "start_invite";
input.addEventListener("click", function start() {
	document.getElementById("chat-body").addEventListener("DOMNodeInserted",
		checkmessage, true);
}, false);

var input2 = document.createElement("input");
input2.className = "gota-btn";
input2.type = "button";
input2.value = "stop script";
input2.id = "stop_invite";
input2.addEventListener("click", function stop() {
	document.getElementById("chat-body").removeEventListener(
		"DOMNodeInserted", checkmessage, true);
}, false);

var mydiv = document.createElement("div");
mydiv.className = "main-version";
mydiv.style.margin = "15px";
mydiv.appendChild(input);
mydiv.appendChild(input2);
document.getElementsByClassName("main-top")[0].appendChild(mydiv);