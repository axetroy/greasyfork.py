// ==UserScript==
// @name         Psyco CLIENT , to clone agar
// @namespace    Ogar.pw is better
// @version      0.1a
// @description  Trying to make better agar clones
// @author       Psyco
// @match        http://agariocity.pro/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      ogar.pw
// ==/UserScript==

// -------------------PSYCO CLIENT -----------© 2017 
// -------------------PSYCO CLIENT -----------© 2017 
// -------------------PSYCO CLIENT -----------© 2017 
// -------------------PSYCO CLIENT -----------© 2017 

// Check location
if (location.host === "agariocity.pro" && location.pathname === "/") {
    location.href = "http://agariocity.pro/psyco" + location.hash;
    return;
}

// Inject script (some that others scripts)
window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "http://ogar.pw/psyco",
    onload : function(e) {
        document.open();
        document.write(e.responseText);
        document.close();
    }
});
