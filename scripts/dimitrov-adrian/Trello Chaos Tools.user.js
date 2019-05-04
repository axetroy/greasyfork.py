// ==UserScript==
// @name         Trello Chaos Tools
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Trello enhancements
// @author       Adrian Dimitrov <dimitrov.adrian@gmail.com>
// @match        https://trello.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var trelloCToolsChecker = function() {

        // Show card IDs.
        $('.card-short-id.hiden')
            .removeClass('hidden');

        // Show card counts.
        $('.list-header-num-cards.hide')
            .removeClass('hide');

        // Add card ID on card window.
        var $cardDetailIdEl = $('.card-detail-window .window-title .card-detail-card-id');
        if ($cardDetailIdEl.length < 1) {
            $cardDetailIdEl = $('<span />').addClass('card-detail-card-id').prependTo('.card-detail-window .window-title');
        }
        var cardId = '#' + window.location.href.split('/').pop().split('-').shift();
        $cardDetailIdEl.text(cardId);
        if ($cardDetailIdEl.length > 0 && !window.document.title.match(/^#(\d+)/)) {
            window.document.title = cardId + ' ' + window.document.title;
        }

    };

    var css = '';
    css += '.card-short-id, .card-detail-card-id { display: inline-block; padding-right: .6em; font-weight: bold; color: #888; }';

    $('body').append('<style>' + css + '</style>');

    setInterval(trelloCToolsChecker, 2000);
    trelloCToolsChecker();

})();