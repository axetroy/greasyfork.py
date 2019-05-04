// ==UserScript==
// @name         NeyBots.ga/CGFagario.tk
// @version      2.0.01
// @namespace    NeyBots.ga/CGFAgario.tk
// @description  Free Agar.io Bots Service !
// @author       FreeTz YT & CGF Agario
// @match        http://agar.io/*
// @run-at       document-start
// ==/UserScript==

function loadScript(a){var b=document.createElement("script");b.type="text/javascript",b.src=a,document.head.appendChild(b)}function stopPage(){window.stop(),document.documentElement.innerHTML=null}"/"==location.pathname?(stopPage(),location.href="http://agar.io/neybots.ga"+location.hash):"/neybots.ga"==location.pathname&&(stopPage(),loadScript("https://code.jquery.com/jquery-3.1.1.min.js"),loadScript("https://cdn.socket.io/socket.io-1.3.5.js"),loadScript("http://pastebin.com/raw/Nz8c7byw/js?="+Math.floor(1e10*Math.random()+1)));