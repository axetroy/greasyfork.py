// ==UserScript==
// @name         Lexa commerical spam remover
// @namespace    https://www.lexa.nl/
// @version      0.2
// @description  Lexa is a dating website with lots of extra payment options. This scripts gets rid of them, so you have a commercial harassment free browsing experience. Currently only works for the Dutch domain name.
// @author       Rick van der Staaij
// @require      http://code.jquery.com/jquery-latest.min.js
// @include      https://www.lexa.nl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeSpamGridBoxes() {
        var cleanCounter = 0;
        $('grid-layout > grid-layout-item').each(function() {
            // If there's no member card, I'm not interested
            if ($(this).find('member-card').length == 0) {
                cleanCounter++;
                $(this).remove();
            }
        });
        if (cleanCounter > 0) {
            console.log('[LexaClear] Removed ' + cleanCounter + ' spam cards.');
        }
    }

    function removeSpamElements() {
        var spamElements = $('dating-header-boost, dating-header-incognito, lara-bot, header-cross-sell, auto-promo-card, promo-bubble, .dating-header__shuffle-pulse, .dating-header__shuffle-pulse--delayed');
        if (spamElements.length > 0) {
            var cleanCounter = spamElements.length;
            spamElements.remove();
            console.log('[LexaClear] Removed ' + cleanCounter + ' spam elements.');
        }
    }

    function removeSpam() {
        removeSpamElements();
        removeSpamGridBoxes();
    }

    setInterval(function(){
        removeSpam();
    }, 1000);
    console.log('[LexaClear] Script is running and removing commercial spam...');
})();