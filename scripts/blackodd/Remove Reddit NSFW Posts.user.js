// ==UserScript==
// @name         Remove Reddit NSFW Posts
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Quick and dirty fix that blocks and removes all NSFW posts on reddit
// @author       BlackOdd (Reddit: /u/BlackOdder)
// @match        http://tampermonkey.net/scripts.php
// @grant        none
// @include      http*://www.reddit.com*
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function() {
        $('.nsfw-stamp').parent().parent().parent().parent().remove();
    }, 100);
})();