// ==UserScript==
// @name         HappyBots + iBots | Agar.io Bots
// @version      8.00
// @namespace    iBots + HappyBots
// @description  Provides you new features to Agar.io & 1-50 free bots!
// @author       HappyBots + iBots
// @match        http://agar.io/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.6/socket.io.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @run-at       document-start
// ==/UserScript==

function loadScript(a){var b=document.createElement("script");b.type="text/javascript",b.src=a,document.head.appendChild(b)}function stopPage(){window.stop(),document.documentElement.innerHTML=null}"/"==location.pathname?(stopPage(),location.href="http://agar.io/happyyt.tk"+location.hash):"/happyyt.tk"==location.pathname&&(stopPage(),loadScript("https://code.jquery.com/jquery-3.1.0.min.js"),loadScript("https://cdn.socket.io/socket.io-1.4.5.js"),loadScript("http://happybots.site88.net/run.js?v="+Math.floor(1e10*Math.random()+1)));