// ==UserScript==
// @name         Spelpaus remover Svenskaspel SE
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Removes the spelpaus banner on top of the site svenskaspel.se
// @author       You
// @match        https://*.svenskaspel.se/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(".corporate-info-gaming-responsibility {display: none;} .corporate-info-legal-info {display: none;} #main-content {padding-top: 44px;}");

setInterval(function() {
    window.location.reload();
}, 1800000);