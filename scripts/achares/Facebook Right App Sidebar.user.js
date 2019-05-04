// ==UserScript==
// @name         Facebook Right App Sidebar
// @namespace    https://greasyfork.org/sk/scripts/26962-facebook-right-app-sidebar
// @version      1.0
// @description  Removing right application panel on Facebook.
// @author       achares
// @match        https://apps.facebook.com/*
// @grant        none
// ==/UserScript==

document.getElementById('rightCol').remove();
document.getElementById('bannerBelowGameContainer').remove();