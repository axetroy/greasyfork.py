// ==UserScript==
// @name         Seamless Auto Delivery Comment for Yext
// @namespace    https://github.com/data-enabler/yext-seamless-auto-delivery-comment
// @version      0.1
// @description  Set the delivery comment when it's close to or after 7pm
// @author       amullings
// @match        https://www.seamless.com/MealsAllocation.m*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var date = new Date();
    var time = date.getHours() * 100 + date.getMinutes();
    if (time >= 1815) {
        document.getElementById('DeliveryComment').value = '24 East 24th Street entrance after 7pm';
    }
})();

