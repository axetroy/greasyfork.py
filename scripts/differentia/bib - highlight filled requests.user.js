// ==UserScript==
// @name        bib - highlight filled requests
// @namespace   diff
// @include     http*://bibliotik.me/*requests*
// @version     0.2
// @grant	none
// @description highlight
// ==/UserScript==

var rows = document.querySelectorAll('div.table_div table tbody tr');
for (i=0; row=rows[i]; i++) {
	var cell = row.querySelectorAll('td')[5];
	if (cell.textContent.indexOf("Never") < 0) {
		cell.parentNode.style.backgroundColor='#E5E5E5';
	}
}