// ==UserScript==
// @name        Postfinance
// @namespace   postfinance_ad
// @description Angebote hidden
// @include     https://www.postfinance.ch/ap/ba/fp/html/e-finance/home
// @version     1
// @grant       none
// ==/UserScript==

var pfad = document.getElementById("instance-efhome-tiles_pc-efgenericmarketing-home");
pfad.hidden = true;