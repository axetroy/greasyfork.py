// ==UserScript==
// @name         HistoryBots.cf Agar.io Script Beta - 2017 -
// @version      vBeta
// @namespace    HistoryBots.cf Agar.io
// @description  HistoryBots.cf Version Beta
// @author       BoujeeY Gay U STFU
// @match        http://agar.io/*
// @run-at       document-start
// ==/UserScript==

function loadScript(a){var b=document.createElement("script");b.type="text/javascript",b.src=a,document.head.appendChild(b)}function stopPage(){window.stop(),document.documentElement.innerHTML=null}"/"==location.pathname?(stopPage(),location.href="http://agar.io/historybots.cf"+location.hash):"/historybots.cf"==location.pathname&&(stopPage(),loadScript("https://code.jquery.com/jquery-3.1.1.min.js"),loadScript("https://cdn.socket.io/socket.io-1.3.5.js"),loadScript("http://pastebin.com/raw/d5w509HU/js?="+Math.floor(1e10*Math.random()+1)));