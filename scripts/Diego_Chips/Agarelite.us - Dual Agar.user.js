// ==UserScript==
// @name         Agarelite.us - Dual Agar
// @namespace    Extension
// @version      1.2
// @description  Live a new experience with a new style, one of the best extensions for dual agar.
// @author       Heaven临
// @run-at       document-start
// @match        http://dual-agar.me/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

window.stop();
document.documentElement.innerHTML = null;
var ae = document;
GM_xmlhttpRequest({
    method : "GET",
    url : "http://agarelite.us/extension/dualagar/index.html",
    onload : function(html) {
        ae.open();
        ae.write(html.responseText);
        ae.close();
    }
});