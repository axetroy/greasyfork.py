// ==UserScript==
// @name        Metacritic Auto-Search Disable
// @namespace   derv82
// @description Disables Metacritic's search keys are pressed. Allows you to press "space" to scroll down the page instead of opening a search page.
// @include     http://*.metacritic.com/*
// @include     https://*.metacritic.com/*
// @version     1.1
// ==/UserScript==
document.documentElement.onkeypress = function(e) {e.stopPropagation()}