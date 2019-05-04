// ==UserScript==
// @name         MyAnimeList(MAL) - Persistent Seasonal View
// @namespace    https://greasyfork.org/en/users/182544-gomen
// @version      0.1
// @description  easier browsing through seasonal anime pages. saves 'my list' filter, current tab choice and automatically selects them when switching between seasons
// @author       Gomen
// @match        *://myanimelist.net/anime/season*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    var settings_name = "mal_seasonal_view";
    var mylist_name = "mylist";
    var tab_name = "selected.tab";
    var settings = JSON.parse(GM_getValue(settings_name, "{}"));
    //console.log(JSON.stringify(settings, null, 2));
    for (var k in settings) {
        if (settings.hasOwnProperty(k)) {
            switch(k) {
                case mylist_name:
                    var mylist = settings[k];
                    for (var key in mylist) {
                        if (mylist.hasOwnProperty(key)) {
                            if (!mylist[key]) {
                                document.getElementById(key).click();
                            }
                        }
                    }

                    break;
                case tab_name:
                    var tab = document.querySelector('.btn-type.js-btn-seasonal[data-key="' + settings[k] + '"]');
                    if (tab !== null) {
                        tab.click();
                    } else {
                        console.log('saved tab element not found in page.');
                    }
                    break;
            }
        }
    }

    window.onbeforeunload = function(){
        var ml_items = document.querySelectorAll('li.ml12.js-btn-sort-order.btn-sort-order');
        var mylist = {};
        ml_items.forEach(function(item) {
            mylist[item.id] = item.classList.contains('selected');
        });

        settings = {};
        var tab = document.querySelector('.btn-type.js-btn-seasonal.on').getAttribute('data-key');
        settings[tab_name] = document.querySelector('.btn-type.js-btn-seasonal.on').getAttribute('data-key');
        settings[mylist_name] = mylist;
        GM_setValue(settings_name, JSON.stringify(settings));
    };
})();