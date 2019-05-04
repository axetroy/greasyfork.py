// ==UserScript==
// @name         Politics and War PPU Updater
// @namespace    https://greasyfork.org/users/60012
// @version      1.0.0
// @description  A simple script to automatically update the price of a resource to one minus the lowest offer when you create an offer. Only works for selling.
// @author       Yosodog
// @match        https://politicsandwar.com/nation/trade/create/
// @grant        none
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';

    // Grab the which resource is selected in the dropdown
    function getSelectedResource() {
        return $("#resourceoption").val();
    }

    // Call to the trade API to get the lowest selling price
    function updatePPU(resource) {
        $.getJSON( "https://politicsandwar.com/api/tradeprice/resource=" + resource)
            .done(function(data) {
            updatePPUInput(data.lowestbuy.price);
        });
    }

    // Update the PPU number input with the lowest price minus one
    function updatePPUInput(ppu) {
        $("#priceper").val(ppu - 1);
    }

    // Update the PPU on load so it auto fills for Food
    updatePPU(getSelectedResource());

    // Run the function everytime the dropdown is changed
    $("#resourceoption").change(function() {
        updatePPU(getSelectedResource());
    });
})();