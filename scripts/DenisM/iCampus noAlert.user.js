// ==UserScript==
// @name         iCampus noAlert
// @namespace    https://github.com/Zibeline/iCampus-noAlert
// @version      0.1
// @description  Removes the annoying "session lost warning" on iCampus
// @author       Zibeline
// @require		 http://code.jquery.com/jquery-latest.js
// @match        *icampus.uclouvain.be/*
// @grant        none
// ==/UserScript==

$(document).ready(function() {
	for (var i = 0; i < 10; i++) {
		clearTimeout(i);
	}
});