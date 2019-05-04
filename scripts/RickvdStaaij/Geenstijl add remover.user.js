// ==UserScript==
// @name         Geenstijl add remover
// @namespace    https://www.geenstijl.nl/
// @version      0.2
// @description  Remove adds articles from Geenstijl.nl
// @author       Rick van der Staaij
// @require      http://code.jquery.com/jquery-latest.min.js
// @include      https://www.geenstijl.nl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeAddArticles() {
        var cleanCounter = 0;
        $('article').each(function() {
            if ($(this).find(".compost-warn:contains('- Ingezonden mededeling -')").length > 0) {
                cleanCounter++;
                $(this).remove();
            }
        });
        if (cleanCounter > 0) {
            console.log('[Geenstijl add killer] Removed ' + cleanCounter + ' spam cards.');
        }
    }

    function removePromoBlocks() {
        $('.article-premium-promotion-block, .become-premium').remove();
    }

    console.log('[Geenstijl add killer] Killing spam...');
    removeAddArticles();
    removePromoBlocks();
})();