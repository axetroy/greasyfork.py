// ==UserScript==
// @name         WK fix 'Next Day'
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Changes the WK Dashboard's "Next Day" to "Next 24 hours"
// @author       TenderWaffles
// @match        https://www.wanikani.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementsByClassName('one-day')[0].childNodes[4].data = " Next 24 Hours";
})();