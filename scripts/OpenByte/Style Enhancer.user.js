// ==UserScript==
// @name            Style Enhancer
// @namespace       styleenhanceropb
// @author          OpenByte
// @icon            https://image.ibb.co/cqzAd6/css.png
// @require         https://greasyfork.org/scripts/34555-greasemonkey-4-polyfills/code/Greasemonkey%204%20Polyfills.js?version=226356
// @description     Enhances the styling on various sites.
// @include         http*://*diepresse.com/*
// @include         http*://*greasyfork.org/*
// @include         http*://*sleazyfork.org/*
// @include         http*://*ccna7.com/*
// @include         http*://*orf.at/*
// @include         http*://*spiegel.de/*
// @include         http*://*rocket-league.com/*
// @license         MIT License
// @encoding        utf-8
// @compatible      firefox
// @compatible      chrome
// @compatible      opera
// @run-at          document-end
// @version         0.7.2
// @grant           GM_addStyle
// @grant           GM.addStyle
// ==/UserScript==
/* jshint esversion: 6 */



const data = [
    {url : "diepresse.com",     	css : "#page { float: none !important; margin: auto !important; }"},
    {url : "orf.at",            	css : ".wrapper { margin: auto !important; }"},
    {url : "greasyfork.org",    	css : "#main-header, #Head { background: #990000 !important; } .PoweredByVanilla { display: none !important; }"},
    {url : "sleazyfork.org",    	css : "#main-header, #Head { background: #990000 !important; }"},
    {url : "ccna7.com",         	css : "body { -moz-user-select: initial !important; -webkit-user-select: initial !important; -ms-user-select: initial !important; user-select: initial !important }"},
    {url : "spiegel.de",        	css : "#wrapper { margin: 0 !important; } #wrapper-shadow { margin: auto !important; }"},
    {url : "rocket-league.com", 	css : ".rlg-trade-display-container { border: 1px solid #ddd; }"}
];

for (let site of data)
    if (location.href.includes(site.url)) {
        GM.addStyle(site.css);
        break;
    }