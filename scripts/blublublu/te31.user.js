// ==UserScript==
// @name         te31
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *te31.com/rgr/*
// @grant        GM_openInTab
// @run-at       document-end
// @namespace https://greasyfork.org/users/166795
// ==/UserScript==

(function() {
    'use strict';

    var honey = $('#honey').html();
    $('#honey').hide();
    $('#honey').prevUntil('table[cellspacing=5]').hide()
    $('<div id="honey2" />').html(honey).insertAfter('#honey');

    var gifClick = function() {
        var gifButtons = $('#honey2 div[id^=gifb_button] span:visible');
        if(gifButtons.length) {
            gifButtons.click();
            setTimeout(gifClick, 100);
        }
    };
    setTimeout(gifClick, 1000);

    $(document).keypress(function(event) {
        console.log(event.charCode);
        if(event.charCode == 97) // 'a'
            $('img[src="image_up.gif"]').prev().each(function(a, b){
                var href = $(b).attr('href');
                var base = (window.location.origin+window.location.pathname).split('/').slice(0, -1).join('/')+'/';
                if(href !== undefined && String(href).length > 0)
                    GM_openInTab(base + href);
            });
    });
})();