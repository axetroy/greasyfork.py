// ==UserScript==
// @name         Unfilter
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  disable chat filter
// @author       Klystro
// @match        http://moomoo.io/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    profanityList.length = 0;
    profanityList[0] = "starve.io";
})();