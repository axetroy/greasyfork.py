// ==UserScript==
// @name         Change MS Office 365 Calendar favicon
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Change MS Office 365 Calendar favicon.
// @author       David López Castellote
// @match        https://outlook.office365.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if( window.location.href.match(/calendar/) ) {
        var link = document.querySelector('link[type="image/x-icon"]');
        link.href = "https://raw.githubusercontent.com/Dellos7/nav-favicon/master/ms-calendar-favicon.ico";
    }
})();