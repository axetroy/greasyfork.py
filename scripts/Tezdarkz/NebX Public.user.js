// ==UserScript==
// @name         NebX Public
// @namespace    http://tampermonkey.net/
// @version      Beta
// @description  try to take over the world!
// @author       NEBULA
// @match        http://dual-agar.online
// @match        http://dual-agar.m
// @grant        GM_xmlhttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js
// ==/UserScript==

window.stop();
document.documentElement.innerHTML = null;

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://178.32.66.232/nebx/',
    onload: function(e) {
        document.open();
        document.write(e.responseText);
        document.close();
    }
});
