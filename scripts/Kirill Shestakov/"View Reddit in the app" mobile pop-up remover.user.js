// ==UserScript==
// @name            "View Reddit in the app" mobile pop-up remover
// @namespace       redditmobilepopupclose
// @include         http://*.reddit.com/*
// @include         https://*.reddit.com/*
// @description:en  Removes the "View Reddit in the app" when accessing reddit on mobile
// @version         1.0
// @run-at          document-start
// @grant           none
// ==/UserScript==

(function() {
    'use strict';
    localStorage.setItem('bannerLastClosed', new Date());
})();