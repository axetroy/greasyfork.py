// ==UserScript==
// @name         Amazon - Highlight resellers
// @namespace    graphen
// @version      1.0.1
// @description  See instantly if the product really comes from Amazon or from a reseller
// @author       Graphen
// @include      /^https?:\/\/www\.amazon\.(cn|in|co\.jp|sg|fr|de|it|nl|es|co\.uk|ca|com(\.(mx|au|br))?)\/.*(dp|gp\/(product|video)|exec\/obidos\/ASIN|o\/ASIN)\/.*$/
// @grant        none
// @icon         https://www.amazon.com/favicon.ico
// ==/UserScript==

/* jshint esversion: 6 */
(function (doc) {
    'use strict';

    function highlight() {
       var merchantId = doc.getElementById("merchantID");
       if (merchantId) {
           var isAmazon = merchantId.value === "A3JWKAKR8XB7XF";

           var merchInfo = doc.getElementById("merchant-info");
           if (merchInfo) {
               if (isAmazon) { merchInfo.style.color = "green"; }
               else {
                   merchInfo.style.color = "fuchsia";
                   // Style reseller name and link
                   let body = doc.querySelector('body');
                   let fontColor = window.getComputedStyle(body).getPropertyValue('color');
                   merchInfo.firstChild.nextSibling.style.cssText = "color: " + fontColor + " !important;";
               }
           }
       }
    }

    highlight();

    // Execute again when item variation is selected
    var buyboxParent = doc.getElementById('desktop_buybox');
    if (buyboxParent) {
        var MO = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(nodeElement) {
                    if (nodeElement.id === "buybox") {
                        highlight();
                    }
                });
            });
        });
        MO.observe(buyboxParent, { childList: true, subtree: true });
    }

})(document);
