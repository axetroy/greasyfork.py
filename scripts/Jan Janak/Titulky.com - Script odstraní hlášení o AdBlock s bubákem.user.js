// ==UserScript==
// @name         Titulky.com - Script odstraní hlášení o AdBlock s bubákem
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Admin_Vidra doporučuje.
// @author       You
// @grant        none
// @include      http://*.titulky.com/*
// @include      https://*.titulky.com/*
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(killthemonster, 200);

})();

function killthemonster() {
    if(document.getElementById('btn-close-adbb')) {
        window.location.href = 'javascript:$().colorbox.close()';
    }
    setTimeout(killthemonster, 200);
}