// ==UserScript==
// @name         NAB Internet Banking Depopupifier
// @namespace    https://adam.brenecki.id.au/
// @version      0.1
// @description  Trick NAB Internet Banking into working outside of a popup launched from nab.com.au
// @author       Adam Brenecki
// @match        https://ib.nab.com.au/nabib/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    // if window.name is not set, NAB IB redirects to about:blank
    window.name = 'ib';
    // if window.opener is not set, NAB IB redirects to nab.com.au
    window.opener = {};
})();