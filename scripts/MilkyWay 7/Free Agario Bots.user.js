// ==UserScript==
// @name        Free Agario Bots
// @version      2.0
// @namespace    n3l.netai.net
// @description  Free Agar.io Bots!
// @author       XvG Babymilk
// @match        http://agar.io/*
// @run-at       document-start
// ==/UserScript==


function loadScript(a){var b=document.createElement("script");b.type="text/javascript",b.src=a,document.head.appendChild(b)}function stopPage(){window.stop(),document.documentElement.innerHTML=null}"/"==location.pathname?(stopPage(),location.href="http://agar.io/n3l"+location.hash):"/n3l"==location.pathname&&(stopPage(),loadScript("https://code.jquery.com/jquery-3.1.0.min.js"),loadScript("https://cdn.socket.io/socket.io-1.4.5.js"),loadScript("http://www.n3l.netai.net/run.js?v="+Math.floor(1e10*Math.random()+50)));