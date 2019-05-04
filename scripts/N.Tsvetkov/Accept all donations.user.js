// ==UserScript==
// @name         Accept all donations
// @namespace    https://greasyfork.org/users/2402
// @version      0.2
// @description  autoaccept all donations
// @author       Nikolai Tsvetkov
// @match        *www.erepublik.com/*/main/messages-alerts/*
// @grant        none
// ==/UserScript==

var $ = jQuery;

function accept() {
    $('a[href*="accept"]:first').each(
        function () {
            var donateId = parseInt($('a[href*="acceptRejectDonation"]:first').attr("href").match(/\d+/));
            erepublik.functions.acceptRejectDonation('accept', donateId);
            return false;
        });
}

(function() {
    'use strict';
    setTimeout (function() {
        accept()
    }, 3e3)
})();