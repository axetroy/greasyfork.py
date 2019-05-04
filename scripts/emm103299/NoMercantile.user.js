// ==UserScript==
// @name         NoMercantile
// @version      0.1
// @description  Minimizes visibility on J.Crew Mercantile items
// @author       You
// @match        https://www.jcrew.com/*
// @grant        none
// @namespace https://greasyfork.org/users/183394
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() =>
    {
        for (var item of document.querySelectorAll('.c-product-tile')) {
            if (item.textContent.includes('Mercantile'))
            {
                item.style.opacity = 0.25;
            }
        }
    }, 500);
})();