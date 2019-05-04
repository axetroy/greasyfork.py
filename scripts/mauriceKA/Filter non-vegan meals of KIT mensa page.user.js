// ==UserScript==
// @name        Filter non-vegan meals of KIT mensa page
// @description The filters on the menu page do not allow filtering for vegan meals. This script delivers that functionality.
// @namespace   ps
// @include     http://www.studentenwerk-karlsruhe.de/*/essen*
// @include     https://www.studentenwerk-karlsruhe.de/*/essen*
// @include     http://www.sw-ka.de/*/essen*
// @include     https://www.sw-ka.de/*/essen*
// @version     1.1
// @license MIT License
// @grant       none
// ==/UserScript==
/* global $ */
(function() {
    'use strict';
    $("td[class=mtd-icon]").parent().addClass("meal-hide");
    $("img[src=/layout/icons/vegan_2.gif]").parent().parent().parent().removeClass("meal-hide");
})();