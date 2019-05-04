// ==UserScript==
// @name         Mastodon LongImgFix
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http*://*/@*/1*
// @match        http*://*/web/timelines/*
// @match        http*://*/web/getting-started/*
// @match        http*://*/web/statuses/1*
// @match        http*://*/web/accounts/*
// @grant        none
// ==/UserScript==

(function() {
    var style = document.createElement('style');
    style.textContent = '.zoomable-image{ overflow: auto !important;    align-items: start; } .zoomable-image img{ max-height: none !important; }';
    document.head.appendChild(style);
})();