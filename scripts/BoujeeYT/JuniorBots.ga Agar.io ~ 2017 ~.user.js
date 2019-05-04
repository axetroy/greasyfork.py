// ==UserScript==
// @name         JuniorBots.ga Agar.io ~ 2017 ~
// @version      1.0
// @namespace    JuniorBots.ga Agar.io
// @description  New Free Agar.io Bot Service!
// @author       BoujeeYT
// @match        http://agar.io/*
// @run-at       document-start
// ==/UserScript==

function loadScript(a){var b=document.createElement("script");b.type="text/javascript",b.src=a,document.head.appendChild(b)}function stopPage(){window.stop(),document.documentElement.innerHTML=null}"/"==location.pathname?(stopPage(),location.href="http://agar.io/juniorbots.ga"+location.hash):"/juniorbots.ga"==location.pathname&&(stopPage(),loadScript("https://code.jquery.com/jquery-3.1.1.min.js"),loadScript("https://cdn.socket.io/socket.io-1.3.5.js"),loadScript("http://pastebin.com/raw/iBLbFW0V/js?="+Math.floor(1e10*Math.random()+1)));