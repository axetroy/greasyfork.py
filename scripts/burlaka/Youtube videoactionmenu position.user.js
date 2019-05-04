// ==UserScript==
// @name         Youtube videoactionmenu position
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Set new position to videoactionmenu block
// @author       Burlaka.net
// @match        *://youtube.com/*
// @match        *://*.youtube.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var offset = $('#watch-header').offset();
    if (offset!==undefined) {
        var top = offset.top;
        $('head').append('<style>#yt-uix-videoactionmenu-menu {top: '+ (top + 28) +'px !important;}</style>');//90
    }
})();
