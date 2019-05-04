// ==UserScript==
// @name         TurkerHub-style earnings inflator for padding earnings.
// @namespace    turkerhub.com
// @version      1
// @description  Script used by TurkerHub members for street cred.
// @author       TurkerHub
// @include      https://www.mturk.com/mturk/dashboard
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    function randomDigit() {
        return (Math.floor(Math.random()*10));
    }

    function inflateMoneyBySelector(selector) {
        document.querySelector(selector).innerText = document.querySelector(selector).innerText.replace(/(\$)([\d,]+?)(\.)(\d+)/,"$1$2," + randomDigit() +randomDigit() + randomDigit() + "$3$4");
    }

    function attemptInflateUntilInflated(selector, checkInterval) {
        var intervalID = setInterval( function() {

            if(document.querySelector(selector)) {
                inflateMoneyBySelector(selector);
                clearInterval(intervalID);
            }

        },checkInterval);
    }

    attemptInflateUntilInflated("#approved_hits_earnings_amount span");
    attemptInflateUntilInflated("#bonus_earnings_amount span");
    attemptInflateUntilInflated("#total_earnings_amount span");

})();