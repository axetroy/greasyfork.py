// ==UserScript==
// @name         Whenlambomoon X-Node Summarize
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Sums up the VeChain X-Node VEN per type (by site load, may break on HTML source code change)
// @author       NicoSiebler
// @match        https://whenlambomoon.com/vechain/nodes/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var domCards = document.querySelectorAll('div.card');
    var venCount;
    var venNodeRows;

    Object(domCards).forEach(function(currentDomCard) {
        venCount = 0
        venNodeRows = currentDomCard.querySelectorAll('tbody tr')
        Object(venNodeRows).forEach(function(currentRowObject) {
            try {
                venCount += parseFloat(currentRowObject.querySelectorAll('td')[1].innerHTML.replace(/[^0-9.]/g,''));
            }
            catch (e) {
                console.log('Exception: ' + e);
                return;
            }
        });
        currentDomCard.querySelectorAll('.card-title')[0].innerHTML += ' - Total VEN: ' + String(venCount);
    });

})();