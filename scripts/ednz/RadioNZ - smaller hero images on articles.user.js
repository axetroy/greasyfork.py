// ==UserScript==
// @name         RadioNZ - smaller hero images on articles 
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ednz
// @match        http://www.radionz.co.nz/*
// @match        http://www.rnz.co.nz/*
// @grant        none
// ==/UserScript==



function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.photo-captioned-full { width:30% !important;float: right !important; padding: 1em; !important; }');
addGlobalStyle('.c-story-header__headline { font-size: 28px !important; }');
