// ==UserScript==
// @name         YouTube remove trending
// @namespace    http://nodebuck.de/
// @version      0.1
// @description  YouTube remove trending tab
// @author       Nodebuck
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

Array.prototype.forEach.call(document.querySelectorAll("*[href=\"/feed/trending\"]"), function( node ) {
    node.parentNode.removeChild(node);
});