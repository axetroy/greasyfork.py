// ==UserScript==
// @name        Fix Infowars
// @namespace   infowars.com
// @description Make Infowars more readable
// @include     http://*.infowars.com/*
// @version     0.0.2
// @grant       GM_addStyle
// ==/UserScript==

// Remove the store links
GM_addStyle('.from-our-store { display: none; }');

// Remove the "promoted" articles
GM_addStyle('.promoted-articles { display: none; }');
