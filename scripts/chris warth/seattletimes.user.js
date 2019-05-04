// ==UserScript==
// @name         seattletimes
// @description removes anti-adblock functionality from seattletimes webste.
// @include http://*seattletimes.com/*
// @include https://*seattletimes.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js
// @run-at document-end
// @version 0.0.1.20180731003424
// @namespace https://greasyfork.org/users/56449
// ==/UserScript==

$(function () {
    "use strict";

    SEATIMESCO.ads.disabled = true;
    SEATIMESCO.browser.adBlock.detectionEnabled = false;
    SEATIMESCO.userMessaging = {};
});