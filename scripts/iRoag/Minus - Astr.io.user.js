// ==UserScript==
// @name         Minus - Astr.io
// @description  Astr.io extension[Not released]!
// @version      N/A
// @author       Roag
// @author       Acydwarp, 2CooLife
// @match        http://astr.io/*
// @match        https://astr.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @namespace https://greasyfork.org/users/32003
// ==/UserScript==


window.stop();

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://rameyx.io/astrio/minus.html',
    onload: function(e) {
        document.open();
        document.write(e.responseText);
        document.close();
    }
});