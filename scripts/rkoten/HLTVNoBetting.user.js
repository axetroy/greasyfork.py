// ==UserScript==
// @name           HLTVNoBetting
// @namespace      ua.rkot
// @description    Remove gambling content from HLTV.org
// @author         Roman Kotenko (github:rkoten)
// @version        1.1.3
// @include        https://www.hltv.org/*
// @grant          none
// @run-at         document-end
// @require        https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

// It is expected that an adblock is on (author recommends uBlock Origin);
// this script removes betting leftovers.

(function(){
    'use strict';
    var sponsors = ['betway', 'buff88', 'unibet', 'egb', 'pinnacle', 'thunderpick', '22bet', 'ggbet'];
    function removeIfSponsored(elems) {
        for (var i = 0; i < elems.length; ++i) {
            for (var j = 0; j < sponsors.length; ++j) {
                if (elems[i].innerHTML.indexOf(sponsors[j]) != -1) {
                    elems[i].remove();
                    break;
                }
            }
        }
    }

    $('.betting-listing')    .remove(); // betting coeffs listing on matchpage
    $('#matchpage_1')        .remove(); // full size ad banner on matchpage
    $('.navbets')            .remove(); // navigation bar bets page link
    $('.footer-responsible') .remove(); // bet responsibly message in site footer
    $('.live-match-sub-text').remove(); // bet responsibly message in featured match footer
    $('.buff-box')           .remove(); // sidebar buff88 banner
    $('.card-game')          .remove(); // match page epics card game banner
    $('.multi-bet-list')     .remove(); // sidebar betting block

    $('.team-odds').remove();                              // sidebar featured match team odds
    $('.featured-match-container').css('height', '128px'); // fix container height correspondingly

    removeIfSponsored($('.live-match-box'));                     // sidebar featured match block
    removeIfSponsored($('.section-header.wide-widget'));         // matches page banner
    removeIfSponsored($('.standard-box.featured-match-widget')); // event page featured match block
    removeIfSponsored($('.widget-match-listing'));               // thunderpick sidebar match listing
}());
