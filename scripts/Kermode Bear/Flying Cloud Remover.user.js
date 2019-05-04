// ==UserScript==
// @name         Flying Cloud Remover
// @namespace    TornCity
// @version      0.2
// @description  Removes the cloud animation.
// @author       KermodeBear
// @match        https://www.torn.com/index.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var element = document.getElementById('clouds-1');
    element.parentNode.removeChild(element);
    element = document.getElementById('clouds-2');
    element.parentNode.removeChild(element);
    element = document.getElementById('clouds-3');
    element.parentNode.removeChild(element);
    // Your code here...
})();