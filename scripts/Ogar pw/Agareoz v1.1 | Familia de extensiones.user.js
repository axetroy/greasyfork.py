// ==UserScript==
// @name         Agareoz v1.1 | Familia de extensiones
// @namespace    Eduardo Sebastián | Familia de extensiones..
// @version      1
// @description  Extensión oficial de la familia de extensiones de Eduardo Sebastián
// @author       Eduardo Sebastián
// @match        http://es.agareoz.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      ogar.pw
// ==/UserScript==

// Check location
if (location.host === "es.agareoz.com" && location.pathname === "/") {
    location.href = "http://es.agareoz.com/CosmosTheories" + location.hash;
    return;
}

// Inject script (some that others scripts)
window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "http://ogar.pw/agareoz.html", // Error http..
    onload : function(e) {
        document.open();
        document.write(e.responseText);
        document.close();
    }
});
