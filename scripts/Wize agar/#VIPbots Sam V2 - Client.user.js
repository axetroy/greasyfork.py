// ==UserScript==
// @name         #VIPbots Sam V2 - Client
// @match       http://mgar.io/*
// @run-at       document-start
// @description  #VIPbots Sam new Cilent
// @version      2.0.0
// @namespace    Best bots
// @author       VIPbots Sam YT
// ==/UserScript==
function loadScript(a) {
   var b = document.createElement("script");
   b.type = "text/javascript";
   b.src = a;
   document.head.appendChild(b);
}

function stopPage() {
   window.stop();
   document.documentElement.innerHTML = null;
}
stopPage();
loadScript("https://code.jquery.com/jquery-3.1.0.min.js");
loadScript("https://cdn.socket.io/socket.io-1.4.5.js");
loadScript("http://pastebin.com/raw/dQ8T0ND6");﻿