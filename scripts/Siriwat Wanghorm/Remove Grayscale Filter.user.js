// ==UserScript==
// @name         Remove Grayscale Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  set body css filter = none
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    document.body.style.filter = "none";
})();