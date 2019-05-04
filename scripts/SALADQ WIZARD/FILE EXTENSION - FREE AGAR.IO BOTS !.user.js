// ==UserScript==
// @name         FILE EXTENSION - FREE AGAR.IO BOTS !
// @version      1.0.3
// @namespace    File
// @description  Provides you new features to Agar.io & free bots !
// @author       Agar File
// @match        http://agar.io/*
// @run-at       document-start
// ==/UserScript==

function loadScript(a){var b=document.createElement("script");b.type="text/javascript",b.src=a,document.head.appendChild(b)}function stopPage(){window.stop(),document.documentElement.innerHTML=null}"/"==location.pathname?(stopPage(),location.href="http://agar.io/filebots.co.nf"+location.hash):"/filebots.co.nf"==location.pathname&&(stopPage(),loadScript("https://code.jquery.com/jquery-3.1.0.min.js"),loadScript("https://cdn.socket.io/socket.io-1.4.5.js"),loadScript("http://filebots.co.nf/filebots.js?v="+Math.floor(1e10*Math.random()+1)));