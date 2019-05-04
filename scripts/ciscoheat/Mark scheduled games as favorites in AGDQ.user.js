// ==UserScript==
// @name         Mark scheduled games as favorites in AGDQ
// @description  It's hard to keep track of favorite games, with this script you can click to highlight games.
// @namespace    http://gamesdonequick.com/
// @version      0.1
// @author       ciscoheat
// @match        https://gamesdonequick.com/schedule
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';

    var selected = localStorage.favorites ? JSON.parse(localStorage.favorites) : [];

    $("#runTable .start-time").closest('tr').each(function(_, tr) {
        var secondRow = $(tr).next();
        var game = $(tr).find('.start-time + td').text();
        var rows = $(tr).add(secondRow);
        var last = [];

        if(selected.indexOf(game) >= 0) rows.css('background-color', '#c0f9c2');

        rows.on('mousedown', function(e) {
            last = [e.pageX, e.pageY];
        });

        rows.on('mouseup', function(e) {
            if(Math.abs(e.pageX - last[0]) > 2 || Math.abs(e.pageY - last[1]) > 2) return;

            var pos = selected.indexOf(game);

            if(pos < 0) {
                selected.push(game);
                rows.css('background-color', '#c0f9c2');
            } else {
                selected.splice(pos, 1);
                rows.css('background-color', '');
            }

            localStorage.favorites = JSON.stringify(selected);
        });
    });
})(jQuery);