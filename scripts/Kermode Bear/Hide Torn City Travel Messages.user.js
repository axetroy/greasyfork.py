// ==UserScript==
// @name         Hide Torn City Travel Messages
// @namespace    Torn
// @version      1
// @description  Hides Torn City Travel Messages
// @author       KermodeBear
// @match        https://www.torn.com/index.php
// @grant        none
// @locale       en
// ==/UserScript==

(function() {
    'use strict';
    var element = document.getElementsByClassName("popup-info")[0];
    if (element) {
        element.parentNode.removeChild(element);
    }
})();