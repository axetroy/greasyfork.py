// ==UserScript==
// @name         Deep sky blue
// @namespace    https://greasyfork.org/users/150647
// @version      1.0
// @description  Adds new option to wrap in Deep sky blue
// @author       A Meaty Alt
// @include      /fairview\.deadfrontier\.com\/onlinezombiemmo\/index\.php\?action=pm;sa=send/
// @include      /fairview\.deadfrontier\.com\/onlinezombiemmo\/index\.php\?action=post2/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const selects = document.querySelectorAll("select");
    const select = selects[selects.length-1];
    const option = document.createElement("option");
    option.value = "#00ccff";
    option.innerHTML = "Deep sky blue";
    select.appendChild(option);
})();