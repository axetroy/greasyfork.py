// ==UserScript==
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @name         Diario16
// @namespace    http://diario16.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      http*://*diario16.com/*
// ==/UserScript==

(function() {
    'use strict';
    window.onload = function() {
        setInterval(function() {
            $('div[id^="sas_"]').remove();
            $('.td-more-articles-box .td-icon-close').click();
            $('aside.adrotate_widgets').remove();
        }, 1);
    };
})();
