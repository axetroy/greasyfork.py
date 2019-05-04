// ==UserScript==
// @name         Remove Youtube Activity Check - Fork
// @description  Removes youtube's new "are you still there" experiment - forked from https://greasyfork.org/scripts/35157
// @include      *://*.youtube.com/*
// @version      2.2
// @grant        none
// @namespace https://greasyfork.org/users/227479
// ==/UserScript==

(function() {
    
    'use strict';
    
    setInterval(function() {
        
        unsafeWindow._lact = Date.now();
        unsafeWindow._fact = Date.now();
        
    }, 1000);

})();
