// ==UserScript==
// @name        Rutracker Magnet URLs
// @namespace	https://greasyfork.org/ru/users/19952-xant1k-bt
// @description Transforms info hash into a magnet url / Transforms torrent hash into a magnet url
// @include     https://rutracker.org/*
// @version     1.0
// ==/UserScript==

var e = document.getElementById("tor-hash");
if (e) {
	var hash = e.innerText;
	if (/^[0-9A-F]{40}$/.test(hash)) {
		e.innerHTML = "<a href='magnet:?xt=urn:btih:" + hash + "'>" + hash + "</a>";
	}
}