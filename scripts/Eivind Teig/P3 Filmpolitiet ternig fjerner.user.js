// ==UserScript==
// @name         P3 Filmpolitiet ternig fjerner
// @namespace    https://greasyfork.org/en/users/171187-eivl
// @version      0.1
// @description  Fjerner terninger fra filmpolitiet
// @author       Eivind Teig
// @match        *://p3.no/filmpolitiet/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
    addGlobalStyle('svg.terning{display:none !important;}');
    addGlobalStyle('.terning-20:before{background-image:none !important;}');
    addGlobalStyle('.terning-55:after{background-image:none !important;}');
    addGlobalStyle('.terning-36:after{background-image:none !important;}');
    addGlobalStyle('.terning{display:none !important;}');
    addGlobalStyle('');
    addGlobalStyle('');
    addGlobalStyle('');
    addGlobalStyle('');
    addGlobalStyle('');
    addGlobalStyle('');


})();