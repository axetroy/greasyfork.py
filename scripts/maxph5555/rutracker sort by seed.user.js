// ==UserScript==
// @name        rutracker sort by seed
// @namespace   userscripts.org
// @description Use the sort by seaders
// @include     http://rutracker.org/forum/*
// @version     1.01
// @grant       none
// ==/UserScript==

var search = document.getElementById("o");
for (var i = 0; i < search.length; i++) {
	if (search.options[i].value == "10") {
		search.selectedIndex = i;
		break;
	}
}