// ==UserScript==
// @name        bibliotik - creator names link directly to torrents
// @namespace   diff
// @include     http*://bibliotik.me/*
// @grant		none
// @version     0.3
// @description eliminates a click
// ==/UserScript==

var links = document.links;
for (i=0; i < links.length; i++) {
	var link = links[i];
	if ( /creators\/\d+$/i.test(link.href) ) {
		link.href += "/torrents";
	}
}