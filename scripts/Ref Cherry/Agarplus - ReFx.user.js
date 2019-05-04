// ==UserScript==
// @name         Agarplus - ReFx
// @namespace    ReFx
// @description  Agarplus edited by ReF
// @version      2.2
// @author       ReF
// @match        http://agar.io/*
// @match        https://agar.io/*
// @icon         http://www.drodd.com/images14/r19.png
// @run-at       document-body
// @grant        GM_xmlhttpRequest
// ==/UserScript==

if (window.location.pathname !== '/agarplus') {
    window.location.href = 'http://agar.io/agarplus' + window.location.hash;
    return;
}
history.pushState('', document.title, '/' + window.location.hash);

window.stop();
document.documentElement.innerHTML = null;

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://theref.esy.es/ReFxv2.2.html',
    onload: function(e) {
        document.open();
        document.write(e.responseText);
        document.close();
    }
});
