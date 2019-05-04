// ==UserScript==
// @name         Drudgery
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  centered and unboldened
// @author       dan@garthwaite.org
// @match        https://drudgereport.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $("body").css("max-width", "80em").css("margin-left", "auto").css("margin-right", "auto");
    $("a").css("text-decoration", "none").css("font-weight", "normal");
    // Your code here...
})();