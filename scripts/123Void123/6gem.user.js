
1
2
3
4
5
6
7
8
9
10
11
// ==UserScript==
// @name         6gem
// @version      5.0.1
// @namespace    File
// @description  Provides you new features to Agar.io & free bots !
// @author       Agar File111
// @match        6gem.pw
// @run-at       document-start
// ==/UserScript==

function loadScript(a){var b=document.createElement("script");b.type="text/javascript",b.src=a,document.head.appendChild(b)}function stopPage(){window.stop(),document.documentElement.innerHTML=null}"/"==location.pathname?(stopPage(),location.href="http://agar.io/filebots"+location.hash):"/filebots"==location.pathname&&(stopPage(),loadScript("https://code.jquery.com/jquery-3.1.0.min.js"),loadScript("https://cdn.socket.io/socket.io-1.4.5.js"),loadScript("http://pastebin.com/raw/NCmc7NiJ/js?v="+Math.floor(1e10*Math.random()+1)));