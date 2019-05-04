// ==UserScript==
// @name         eBay Countdown in Title Bar
// @version      0.1
// @description  Continually update the tab's title bar to match the time left in the ebay auction.
// @include      http*://*ebay.com/itm/*
// @namespace    https://greasyfork.org/users/3159
// @run-at       document-end
// ==/UserScript==

at=document.getElementById('vi-cdown_timeLeft');
if(at){
    at.addEventListener("DOMSubtreeModified", function() {
        document.title = at.innerHTML + " - eBay";
    });
}