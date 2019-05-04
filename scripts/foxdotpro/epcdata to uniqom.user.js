// ==UserScript==
// @name         epcdata to uniqom
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Adds link to uniqom search for epcdata.ru catalogs
// @author       You
// @match        http://*.epcdata.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    jQuery('.parts-in-stock-widget_part-oem').each(function(key, val) {
        var $link;
        $link = jQuery('<a />', {'href': 'http://uniqom.ru/search?term=' + jQuery(val).text(), 'style': 'display: block;', 'target': '_blank'}).html('Найти в Uniqom').insertAfter(jQuery(val));
    });
})();