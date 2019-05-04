// ==UserScript==
// @name         btbtt download
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.btbtt.co/thread*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('a[href^="attach"]').attr('href', function() {
        return $(this).attr('href').replace('-dialog-','-download-');
    }).removeAttr('target');
})();