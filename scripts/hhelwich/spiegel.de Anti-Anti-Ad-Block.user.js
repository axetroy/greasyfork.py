// ==UserScript==
// @description Prevents Popup on spiegel.de which appears if you are using an Ad Blocker
// @name     spiegel.de Anti-Anti-Ad-Block
// @version  1
// @grant    unsafeWindow
// @include  http://www.spiegel.de/*
// @namespace https://greasyfork.org/users/183491
// ==/UserScript==

unsafeWindow.setTimeout = () => {};
