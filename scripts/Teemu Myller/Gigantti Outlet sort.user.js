/* This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.*/

// ==UserScript==
// @name         Gigantti Outlet sort
// @license      WTFPL; http://www.wtfpl.net/
// @namespace    http://ttmyller.azurewebsites.net/
// @version      0.3
// @description  Enable sorting for Gigantti Outlet items
// @author       ttmyller
// @match        https://gigantti3.weboutlet.fi/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var cols = [$('.col1 .content'), $('.col2 .content')];

    // Yeah, I wasn't too keen to make it look awesome..
    $('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">');
    $('head').append('<link rel="stylesheet" href="https://lysidia.blob.core.windows.net/cdn/goutlet.css">');

    // create links for sorting items
    function sortLinks(key) {
        return ' <a href="#" class="goutlet-sort glyphicon glyphicon-hand-up"   onclick="sortItems(\'' + key + '\', true)" ></a>' +
               ' <a href="#" class="goutlet-sort glyphicon glyphicon-hand-down" onclick="sortItems(\'' + key + '\', false)"></a>';
    }

    $('.t2').append(sortLinks('price'));
    $('.t3').append(sortLinks('rrp'));
    $('.t4').append(sortLinks('percent'));

    // Loop items
    $('div.item').each(function () {
        var item = $(this);

        // If there's no buttons for ordering this item, hide it
        var buttons = $('div.buttons a', item);
        if (buttons.length === 0) {
            item.hide();
        }
        else {
            // Get prices and percent from elements and save them in data
            var salePrice = $('div.sale', item).text().replace(/[^0-9\,]/g, '');
            var normalPrice = $('div.normal', item).text().replace(/[^0-9\,]/g, '');
            var salePercent = $('div.percent', item).text().replace(/\D/g,'');
            item.data('price', parseFloat(salePrice.replace(',','.')));
            item.data('rrp', parseFloat(normalPrice.replace(',','.')));
            item.data('percent', parseFloat(salePercent.replace(',','.')));
        }
    });

    window.sortItems = function(key, asc) {
        var allItems = $('div.item');

        // sort items ascending or descending
        allItems.sort(function(a, b) {
            if (asc)
                return $(a).data(key)-$(b).data(key);
            else
                return $(b).data(key)-$(a).data(key);
        });

        // Detach items from their parents
        allItems.each(function() { $(this).detach(); });

        // Loop items and add them to columns in sorted order
        var index = 0;
        allItems.each(function() {
            cols[index].append($(this));
            index = (index + 1) % 2;
        });
    };
})();