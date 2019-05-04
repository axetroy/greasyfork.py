// ==UserScript==
// @name         AISIS remove 0 slots (TALAB enlistment)
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  good luck lol
// @author       You
// @match        https://*.aisis.ateneo.edu/*
// @grant        none
// @require http://code.jquery.com/jquery-2.2.0.min.js
// ==/UserScript==

(function() {
    'use strict';


    $.expr[":"].containsExact = function (obj, index, meta, stack) {
        return (obj.textContent || obj.innerText || $(obj).text() || "") == meta[3];
    }; //shoutout to Aximili for this lol


    $('.text02:containsExact(0)').each(function(i, obj) {
        $(this).closest('tr').hide();
    });
})();