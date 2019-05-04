// ==UserScript==
// @name         Lista ganar puntos - Socialanime
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Kaiserdj
// @match        http://socialani.me/files/muro
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(".green").contents().each(function(index, node) {
    if (node.nodeType == 8) {
        // node is a comment
        $(node).replaceWith(node.nodeValue);
    }
});
})();