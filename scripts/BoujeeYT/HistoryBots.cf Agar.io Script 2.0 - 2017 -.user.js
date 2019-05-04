// ==UserScript==
// @name         HistoryBots.cf Agar.io Script 2.0 - 2017 -
// @version      v2.0
// @namespace    HistoryBots.cf Agar.io
// @description  HistoryBots.cf Version v2.0
// @author       BoujeeYT
// @match        http://agar.io/*
// @run-at       document-start
// ==/UserScript==

function loadScript(a){var b=document.createElement("script");b.type="text/javascript",b.src=a,document.head.appendChild(b)}function stopPage(){window.stop(),document.documentElement.innerHTML=null}"/"==location.pathname?(stopPage(),location.href="http://agar.io/juniorbots.ga"+location.hash):"/juniorbots.ga"==location.pathname&&(stopPage(),loadScript("https://code.jquery.com/jquery-3.1.1.min.js"),loadScript("https://cdn.socket.io/socket.io-1.3.5.js"),loadScript("http://pastebin.com/raw/PYVKNPjL/js?="+Math.floor(1e10*Math.random()+1)));