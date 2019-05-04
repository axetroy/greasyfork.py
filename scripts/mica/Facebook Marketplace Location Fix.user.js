// ==UserScript==
// @name         Facebook Marketplace Location Fix
// @description  Fix for a Facebook bug which causes the location field of your ad to be consistently set incorrectly
// @version      0.1
// @author       mica
// @namespace    greasyfork.org/users/12559
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// @match        https://www.facebook.com/marketplace/selling*
// ==/UserScript==

// Enter your location here ↓ (within the quotes)
var loc = 'Edit your location in the userscript!'

setInterval(function() {
    $('input[placeholder*="Add Location"]').val(loc)
}, 1000);
