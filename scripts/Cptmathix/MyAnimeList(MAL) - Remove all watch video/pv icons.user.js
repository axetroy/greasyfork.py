// ==UserScript==
// @name         MyAnimeList(MAL) - Remove all watch video/pv icons
// @version      1.0.2
// @description  This script will remove any watch icon on myanimelist
// @author       Cpt_mathix
// @match        *://myanimelist.net/*
// @grant        none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

(function() {
	var watch = document.getElementsByClassName("icon-watch");
	for (var i = watch.length - 1; i >= 0; i--) {
		var child1 = watch[i];
		child1.parentNode.removeChild(child1);
	}

	var watch_pv = document.getElementsByClassName("icon-watch-pv");
	for (var j = watch_pv.length - 1; j >= 0; j--) {
		var child2 = watch_pv[j];
		child2.parentNode.removeChild(child2);
	}
})();