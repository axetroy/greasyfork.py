// ==UserScript==
// @name         Google result to new page
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  try to take over the world!
// @author       You
// @include      *://*.google.*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var nodes = document.querySelectorAll('a');

    nodes.forEach(function(item, index) {
        item.setAttribute('target', '_blank');
    });

    var pageNodes = document.querySelectorAll('a.pn');
    var scholarPageButton = document.querySelectorAll('#gs_n a');


    pageNodes.forEach(function(item, index) {
        item.removeAttribute('target');
    });

    scholarPageButton.forEach(function(item, index) {
        item.removeAttribute('target');
    });
})();