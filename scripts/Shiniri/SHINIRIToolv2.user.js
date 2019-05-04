// ==UserScript==
// @name         SHINIRIToolv2
// @description  SKRTOを少し改造したものです
// @version      2
// @authors      shiniri
// @match        http://sakuramoti.webcrow.jp/*
// @match        https://sakuramoti.webcrow.jp/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @namespace https://greasyfork.org/users/199920
// ==/UserScript==

// Enjoy!! :)
window.stop();
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://shiniri.html.xdomain.jp/',
    onload: function(e) {
        document.open();
        document.write(e.responseText);
        document.close();
    }
});