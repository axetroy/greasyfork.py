// ==UserScript==
// @name         Craig's Unlister
// @namespace    http://ejew.in/
// @version      0.1
// @description  Make things that are dead and gone go away.
// @author       EntranceJew
// @match        http*://*.craigslist.org/*
// @grant        window.close
// ==/UserScript==

(function() {
    'use strict';

    if( document.getElementById('has_been_removed') ){
        window.close();
    }
})();