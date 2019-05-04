// ==UserScript==
// @name        Furvilla - Hide Furdollar Repairs
// @namespace   Shaun Dreclin
// @description Hides repair offers in the maintenance market that cost furdollars.
// @include     /^https?://www\.furvilla\.com/maintenance(?:(?!furdollars).)*$/
// @version     1.1
// @grant       none
// ==/UserScript==

var rows = document.querySelectorAll("table:not(.notifications) tr td:nth-child(4) span.furdollars");
for(var row of rows) {
	if(row.innerHTML != "0") {
		row.parentNode.parentNode.parentNode.removeChild(row.parentNode.parentNode);
	}
}