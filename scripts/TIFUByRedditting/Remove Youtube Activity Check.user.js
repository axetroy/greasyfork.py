// ==UserScript==
// @name         Remove Youtube Activity Check
// @description  Removes youtube's new "are you still there" experiment
// @include      *://*.youtube.com/*
// @version      1.0
// @grant        none
// @namespace https://greasyfork.org/users/159236
// ==/UserScript==

(function() {

    'use strict';

    setInterval(function() {

        yt.util.activity.getTimeSinceActive = function xi() {
            return 0;
        };

    }, 1000);

})();