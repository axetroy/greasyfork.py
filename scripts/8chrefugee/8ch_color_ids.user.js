// ==UserScript==
// @name         8ch_color_ids
// @namespace    http://https://8ch.pl/
// @version      0.1
// @description  Adding colors to IDs on 8ch.pl
// @author       Refugee
// @match        https://8ch.pl/pol/res/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

        $(document).ready(function () {
        var ids = $(".poster_id");
        $.each(ids, function (index, span) {
            $(this).css("background-color", "#" + $(".poster_id")[index].innerHTML);
        });
    });
})();