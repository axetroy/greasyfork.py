// ==UserScript==
// @name         General Magnet Link Cleaner
// @description  Reduces magnet links to their HASH source
// @namespace    IAmTheEvil404
// @version      3.5
// @license      Public Domain
// @include      http*://yts.*
// @include      http*://kat.*
// @include      http*://rarbg.*
// @include      http*://thepiratebay.*
// @include      http*://eztv.*
// @include      http*://showrss.*
// @include      http*://new.showrss.*
// @include      http*://kickass.unblocked.*
// @grant        none
// ==/UserScript==

$('a[href^="magnet:"]').each(function() {
    var $button = $(this);
    var href = $button.attr('href');
    if (href)
        $button.attr('href', href.replace(/&.*$/, ''));
});