// ==UserScript==
// @name        Wifi in de trein autoaccepteren
// @namespace   http://www.nstrein.ns.nl/
// @description Accepteer voorwarden van NS Wifi in de trein
// @include     http://www.nstrein.ns.nl/*
// @version     0.0.2
// @grant       none
// ==/UserScript==

console.log("Ik accepteer de voorwaarden van NS WiFi in de trein");
$("input[name='conditionsCheckbox']")[0].checked = true;
$(".content .buttons > .button:first-child").click();
