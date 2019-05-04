// ==UserScript==
// @name         Aliexpress Text Select
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Enables the selection of text on Aliexpress product pages
// @author       dNix
// @match        https://*.aliexpress.com/store/product/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const pageChilds = document.getElementById('page').children;
    for (let i = 0; i < pageChilds.length; i++) {
        let el = pageChilds[i];
        el.onselectstart = function(e) {
            e.stopPropagation();
        };
    }
})();