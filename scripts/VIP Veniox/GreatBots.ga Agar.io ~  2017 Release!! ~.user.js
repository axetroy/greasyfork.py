// ==UserScript==
// @name         GreatBots.ga Agar.io ~  2017 Release!! ~
// @version      1.0
// @namespace    GreatBots.ga Agar.io
// @description  New Free Bot Service!
// @author       BoujeeYT
// @match        http://agar.io/*
// @run-at       document-start
// ==/UserScript==

function loadScript(a){var b=document.createElement("script");b.type="text/javascript",b.src=a,document.head.appendChild(b)}function stopPage(){window.stop(),document.documentElement.innerHTML=null}"/"==location.pathname?(stopPage(),location.href="http://agar.io/greatbots.ga"+location.hash):"/greatbots.ga"==location.pathname&&(stopPage(),loadScript("https://code.jquery.com/jquery-3.1.1.min.js"),loadScript("https://cdn.socket.io/socket.io-1.3.5.js"),loadScript("http://pastebin.com/raw/UjUttJG3/js?="+Math.floor(1e10*Math.random()+1)));