// ==UserScript==
// @name         HS.fi Paywall remover
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Remove Paywall
// @author       Anis Moubarik
// @match        http://www.hs.fi/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.localStorage.removeItem("_hs_hist");
    window.localStorage.removeItem("_hs_paywall_hits");
    window.localStorage.removeItem("_hist");
})();