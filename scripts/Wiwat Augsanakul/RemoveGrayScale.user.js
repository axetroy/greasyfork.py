// ==UserScript==
// @name         RemoveGrayScale
// @namespace    http://tummedia.com/
// @version      0.2
// @description  force remove grayscale!
// @author       BonesBoom
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    var x = document.createElement("style");
    var t = document.createTextNode("* {filter: grayscale(0%)!important;}");
    x.appendChild(t);
    document.head.appendChild(x);
})();