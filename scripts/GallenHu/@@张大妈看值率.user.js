// ==UserScript==
// @name         @@张大妈看值率
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  桌面web端张大妈显示值率
// @author       You
// @match        *://search.smzdm.com/*
// @require https://cdn.staticfile.org/jquery/1.12.2/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var $listItems = $('#feed-main-list .feed-row-wide');
    $.each($listItems, function (i, item) {
        var zhi = $(item).find('[data-zhi-type="1"]').text();
        var buzhi = $(item).find('[data-zhi-type="-1"]').text() || 0;
        var result = 0;
        if (parseInt(buzhi) === 0) {
            if (parseInt(zhi) !== 0) result = 1;
        } else {
            result = parseInt(zhi) / (parseInt(zhi) + parseInt(buzhi));
        }

        var percent = parseFloat(result*100).toFixed(0);
        var className = percent > 49 ? 'z-highlight' : ''
        $(item).find('.price-btn-hover').prepend(`<span class="${className}" style="margin-right:20px">${percent}%</span>`);
    });
})();
