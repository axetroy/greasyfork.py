// ==UserScript==
// @name         DFP Tooltip blocker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  removes anoying tooltips
// @author       Torsten
// @match        https://www.google.com/dfp/*
// @grant        none
// ==/UserScript==

(function() {
    var css = '[class*="gux-tooltip"]{ display:none; !important; }';
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

head.appendChild(style);
})();