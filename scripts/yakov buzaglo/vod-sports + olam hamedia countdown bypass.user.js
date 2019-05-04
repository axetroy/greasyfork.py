// ==UserScript==
// @name         vod-sports + olam hamedia countdown bypass
// @namespace    http://google.com/
// @version      0.1
// @description  vod-sports + olam hamedia countdown bypasser
// @author       yakov buzaglo
// @match        *://vod-sports.blogspot.co.il/*.html
// @include      *://www.olam-hamedia.tech/*.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $("#timer-frame").hide();
    $("#action-frame").show();
        clearInterval(counter);
})();