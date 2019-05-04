// ==UserScript==
// @name         HSLO v4
// @description  OAG tool
// @version      4.9.9
// @author       2coolife
// @match        http://agar.io/*
// @match        https://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @namespace https://greasyfork.org/users/185709
// ==/UserScript==

window.stop();

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://2coolife.com/HSLOv430/hslo.html',
    onload: function(e) {
        document.open();
        document.write(e.responseText);
        document.close();
    }
});
