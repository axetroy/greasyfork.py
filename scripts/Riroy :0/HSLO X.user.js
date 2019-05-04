// ==UserScript==
// @name         HSLO X
// @namespace    riroy.pe.hu
// @description  здесь может быть ваша реклама
// @version      0.0.1
// @author       2coolife, riroyka
// @match        http://agar.io/*
// @match        https://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// ==/UserScript==

window.stop();

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://riroy.pe.hu/HSLOMi2/hslo.html',
    onload: function(e) {
        document.open();
        document.write(e.responseText);
        document.close();
    }
});