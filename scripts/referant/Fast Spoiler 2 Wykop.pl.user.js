// ==UserScript==
// @name        Fast Spoiler 2 Wykop.pl
// @description Wystarczy najechać myszą, aby zobaczyć spoiler.
// @namespace   http://www.wykop.pl/ludzie/referant/
// @include     http://*.wykop.pl/*
// @version     2.0
// @grant       none
// @run-at      document-end
// ==/UserScript==

$('#itemsStream, #hotEntriesBox, #upc,.pmStream').on('mouseenter', 'a.showSpoiler', function () {
    $(this).trigger('click');
});