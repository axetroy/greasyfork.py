// ==UserScript==
// @name         Production warning
// @namespace    https://greasyfork.org/production-warning
// @version      0.1
// @description  Warns you when you are in production
// @author       Jason Barnabe
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var div = document.createElement("div");
    div.innerHTML = "PRODUCTION";
    div.style = "position: fixed; right: 0; bottom: 0; font-size: 80px; pointer-events: none; color: red; opacity: 0.3; padding: 1em; z-index: 1000000";
    document.body.appendChild(div);
})();