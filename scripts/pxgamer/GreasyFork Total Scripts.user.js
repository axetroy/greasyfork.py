// ==UserScript==
// @name         GreasyFork Total Scripts
// @namespace    pxgamer
// @version      0.2.1
// @description  Shows a user's total scripts count on GreasyFork
// @author       pxgamer
// @include      *greasyfork.org/en/users/*
// @grant        none
// ==/UserScript==
/*jshint multistr: true */

(function() {
    'use strict';

    let l = $('li[data-script-id]').length;
    if (l == 1) {
        $('div.width-constraint h2:first').append('<span style="font-size: 15px;">  [' + l + ' Total Script]</span>');
    }
    else {
        $('div.width-constraint h2:first').append('<span style="font-size: 15px;">  [' + l + ' Total Scripts]</span>');
    }
})();
