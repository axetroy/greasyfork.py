// ==UserScript==
// @name         CP PLUS
// @namespace    Extension
// @version      1.0
// @description  Extension 3rb.be R7AL
// @author        RH
// @run-at       document-start
// @match        http://3rb.be/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

window.stop();
document.documentElement.innerHTML = null;
var ae = document;
GM_xmlhttpRequest({
    method : "GET",
    url : "http://rhalonyx.dx.am/CP-CLAN/CP.html",
    onload : function(html) {
        ae.open();
        ae.write(html.responseText);
        ae.close();
    }
});