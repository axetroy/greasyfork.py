// ==UserScript==
// @name			Filmweb Ads Killswitch
// @name:pl			Wyłacznik reklam Filmweb
// @namespace		http://tampermonkey.net/
// @version			0.2
// @description		Disables filmweb ads by exploiting builtin killswitch
// @description:pl	Wyłącza reklamy Filmweb wykorzystując wbudowany wyłącznik
// @author			adamaru
// @match			*://www.filmweb.pl/*
// @grant			none
// @run-at			document-start
// @noframes
// ==/UserScript==

(function() {
	'use strict';
	if (window.location.search.length === 0){
		window.location.search = "ref=rodo"
		return;
	}
	if(window.location.search.indexOf("ref=rodo") < 0){
		window.location.search += "&ref=rodo"
	}
})();