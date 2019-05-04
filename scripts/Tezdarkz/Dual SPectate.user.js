
// ==UserScript==
// @name         Dual SPectate
// @namespace    cc
// @description  Dual Agar Extension
// @version      ∞
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @author       Nebula
// @match        http://dual-agar.online
// @grant        GM_xmlhttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js
// ==/UserScript==


window.stop();
document.documentElement.innerHTML = null;

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://xn3bula.ga/spectate',
    onload: function(e) {
        document.open();
        document.write(e.responseText);
        document.close();
    }
});