// ==UserScript==
// @name         pkgetBigMap
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bigger map for pkget.com & remove ads.
// @author       SSARCandy
// @match        https://pkget.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('body > section.text-wrap').remove();
    $('#map').css('height', '90vh');
    window.dispatchEvent(new Event('resize'));
})();