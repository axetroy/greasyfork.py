// ==UserScript==
// @name         Google Docs Animations
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds animations to Google Docs
// @author       Blue-Guy
// @match        https://docs.google.com/document/d/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    
    var divNode = document.createElement("div");
    divNode.innerHTML = "<style>* { transition: 300ms cubic-bezier(0.22, 0.6, 0.12, 1.05); }</style>";
    document.head.appendChild(divNode);
})();