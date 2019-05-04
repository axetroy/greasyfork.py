// ==UserScript==
// @name         ForJoyTV Unlimited Demo
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Disable ForJoyTV demo time restriction and watch without interruption
// @author       iczman
// @match        http://play.forjoytv.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Disable trial timer
    setInterval(function () {
        if (typeof gTrialStopTimer !== 'undefined') {
            clearTimeout(gTrialStopTimer);
            gTrialStopTimer = null;
        }

        if (typeof gTrialStopTimer2 !== 'undefined' && gTrialStopTimer2.h) {
            clearTimeout(gTrialStopTimer2.h);
            gTrialStopTimer2.h = null;
        }

        if (typeof gts !== 'undefined' && gts.h) {
            clearTimeout(gts.h);
            gts.h = null;
        }

        gSingling = true;
    }, 10000);

    // Disable redirect on page refresh
    location.replace("#");
})();