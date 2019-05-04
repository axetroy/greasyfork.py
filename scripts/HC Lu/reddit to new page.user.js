// ==UserScript==
// @name         reddit to new page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include        *://*.reddit.*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var nodes = document.querySelectorAll('a.title');
    var imgs = document.querySelectorAll('img');

    nodes = Array.prototype.slice.call(nodes, 0);

    nodes.forEach(function(item, index) {
        item.setAttribute('target', '_blank');
    });

})();