// ==UserScript==
// @name         Filmezz.eu Felugróablak Tiltó
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://stackoverflow.com/questions/18560335/how-to-refresh-dom-with-newly-created-elements
// @grant        none
// @include      *://filmezz.eu/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('beforescriptexecute', function() {

        var badScripts= $("section:contains('Ez is érdekelhet')");
        badScripts.remove ();
    }, true);
})();