// ==UserScript==
// @name         Sci-Hub Out
// @namespace    http://itianda.com/
// @version      0.1.2
// @description  Get out of the iframe.
// @author       itianda
// @match        *://*.sci-hub.org/*
// @match        *://*.sci-hub.bz/*
// @match        *://*.sci-hub.cc/*
// @match        *://*.sci-hub.io/*
// @match        *://*.sci-hub.tw/*
// @match        *://*.sci-hub.la/*
// @match        *://*.sci-hub.hk/*
// @match        *://*.sci-hub.tv/*
// @match        *://80.82.77.83/*
// @match        *://80.82.77.83/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var sPDFLink = document.querySelector('#pdf').src;
    window.location.href = sPDFLink;
})();