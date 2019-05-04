// ==UserScript==
// @name        Furvilla - Hide Recent Activity
// @namespace   Shaun Dreclin
// @description Removes recent forum activity from the sidebar.
// @include     /^https?://www\.furvilla\.com/.*$/
// @version     1.0
// @grant       GM_addStyle
// ==/UserScript==

//Chemotherapy
GM_addStyle(".recent-posts { display: none; }");
