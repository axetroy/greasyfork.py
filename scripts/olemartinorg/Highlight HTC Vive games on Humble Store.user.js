// ==UserScript==
// @name        Highlight HTC Vive games on Humble Store
// @namespace   org.olemartin.htc-vive-highlight
// @description Highlights games that supports the HTC Vive on the Humble Store, so that you don't have to hover over the 'platforms' icon to know which games have a VR mode
// @include     https://www.humblebundle.com/store*
// @version     1
// @grant       none
// ==/UserScript==

(function ($) {

    var highlighter = function () {
        $('.storefront-list-product .hb-vive')
            .closest('.storefront-list-product')
            .css({background: '#a3e5b4'});
    };
    
    $(document).ajaxSuccess(highlighter).ready(highlighter);
    
})(jQuery);