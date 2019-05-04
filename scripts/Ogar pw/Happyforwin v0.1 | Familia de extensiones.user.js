// ==UserScript==
// @name         Happyforwin v0.1 | Familia de extensiones
// @namespace    Eduardo Sebastián | Familia de extensiones..
// @version      0.1
// @description  Extensión oficial de la familia de extensiones de Eduardo Sebastián
// @author       Eduardo Sebastián
// @match        http://happyfor.win/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      ogar.pw
// ==/UserScript==

// Check location
if (location.host === "happyfor.win" && location.pathname === "/") {
    location.href = "http://happyfor.win/CosmosTheories" + location.hash;
    return;
}

// Inject script (some that others scripts)
window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "http://ogar.pw/h.html", // Error http..
    onload : function(e) {
        document.open();
        document.write(e.responseText);
        document.close();
    }
});
