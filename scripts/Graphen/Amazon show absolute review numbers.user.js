// ==UserScript==
// @name         Amazon show absolute review numbers
// @namespace    graphen
// @version      1.0.0
// @description  Adds the number of reviews to each rating separately
// @author       Graphen
// @include      /^https?:\/\/www\.amazon\.(cn|in|co\.jp|sg|fr|de|it|nl|es|co\.uk|ca|com(\.(mx|au|br))?)\/.*(dp|gp\/(product|video)|exec\/obidos\/ASIN|o\/ASIN|product-reviews)\/.*$/
// @icon         https://www.amazon.com/favicon.ico
// @grant        none
// @noframes
// ==/UserScript==
/* jshint esversion: 6 */

(function() {
    'use strict';

    var totalReviewCount = document.querySelector('[data-hook="total-review-count"]').innerText;
    var arrPercentages = Array.from(document.querySelectorAll("#histogramTable .a-text-right > *:first-child"));

    if (totalReviewCount && arrPercentages) {
        // Sanitize totalReviewCount
        // Remove all non-digits
        totalReviewCount = totalReviewCount.replace(/\D/g, '');
        // Convert string to integer
        totalReviewCount = parseInt(totalReviewCount, 10);
        // Check for nonsense (Most reviewed product has ~100000 at the moment)
        if (totalReviewCount < 250000) {
            for (var e of arrPercentages) {
                let v = e.innerText;
                // Get rid of percentage sign and convert string to integer
                v = parseInt(v, 10);
                // Calculate absolute review count
                v = Math.round(v * totalReviewCount / 100);
                // Cancel if nonsense
                if (v > totalReviewCount || v < 0) {
                    break;
                }
                // Append calculated value to visible node
                e.textContent += " (" + v + ")";
            }
        }
    }

})();
