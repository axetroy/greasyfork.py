// ==UserScript==
// @name         MyAnimeList(MAL) - Popup for "Edit Details"
// @version      1.1.1
// @description  This script will show a popup when you click "Edit details" on any anime/manga page.
// @author       Cpt_mathix
// @include      /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+/
// @include      /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+\/.*/
// @include      *://myanimelist.net/(anime|manga).php?id=*
// @license      GPL-2.0-or-later
// @grant        none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

(function() {
    'use strict';

    function popupForEditDetails() {
        var pageEdit = document.querySelector('#addtolist > table > tbody > tr > td:nth-child(2) > small > a');
        if (pageEdit) {
            pageEdit.className = "Lightbox_Script button_add";
            pageEdit.href += "?hideLayout=1";
        }

        var pageAddDetails = document.querySelector('#addtolistresult > a');
        if (pageAddDetails) {
            pageAddDetails.className = "Lightbox_Script button_add";
            pageAddDetails.href += "&hideLayout=1";
        }

        $('.Lightbox_Script').fancybox({
            'width'			: 700,
            'height'		: '85%',
            'overlayShow'	: false,
            'titleShow'     : false,
            'type'          : 'iframe'
        });
    }

    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ popupForEditDetails +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);
})();