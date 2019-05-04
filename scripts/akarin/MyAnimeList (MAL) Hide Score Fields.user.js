// ==UserScript==
// @name        MyAnimeList (MAL) Hide Score Fields
// @namespace   https://greasyfork.org/users/7517
// @description Hides score input fields on MAL pages.
// @icon        http://i.imgur.com/b7Fw8oH.png
// @version     1.5
// @author      akarin
// @include     /^https?:\/\/myanimelist\.net\/(anime|manga)(\.php\?id=|\/)\d+/
// @include     /^https?:\/\/myanimelist\.net\/top(anime|manga)\.php/
// @include     /^https?:\/\/myanimelist\.net\/addtolist\.php/
// @include     /^https?:\/\/myanimelist\.net\/panel\.php\?go=(add|edit)/
// @include     /^https?:\/\/myanimelist\.net\/editlist\.php\?type=anime/
// @include     /^https?:\/\/myanimelist\.net\/ownlist\/(anime|manga)\//
// @grant       none
// ==/UserScript==

/*jslint fudge, maxerr: 10, browser, devel, this, white, for, single */
/*global jQuery */

(function($) {
    'use strict';

function hideScores(e) {
    $('td.borderClass:contains(Score)', e.target || e).parent().hide();
}

if ($('#malLogin').length === 0) {
    if (document.URL.match(/^https?:\/\/myanimelist\.net\/(anime|manga)/)) {
        $('td.spaceit:contains(Your Score)').parent().hide();
        $('.user-status-block .form-user-score').hide();
    } else
    if (document.URL.match(/^https?:\/\/myanimelist\.net\/top(anime|manga)/)) {
        $('.top-ranking-table td.your-score').hide();
    } else {
        hideScores($('body').on('DOMNodeInserted', hideScores));
    }
}

}(jQuery));