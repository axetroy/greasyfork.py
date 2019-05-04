// ==UserScript==
// @name         Pixnet Cleanup
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove pixnet.net modal dialog that displays after inactive for 3 minutes
// @author       iczman
// @match        http://*.pixnet.net/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';
    
    $('#idleTemplate').remove();
})();