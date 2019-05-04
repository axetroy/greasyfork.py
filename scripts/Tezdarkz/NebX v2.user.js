
// ==UserScript==
// @name         NebX v2
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description 2.0
// @author       Nebula
// @match        http://dual-agar.online
// @grant        GM_xmlhttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js
// ==/UserScript==

window.stop();
document.documentElement.innerHTML = null;

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://178.32.66.232/nebxv2/index.html',
    onload: function(e) {
        document.open();
        document.write(e.responseText);
        document.close();
    }
});
