// ==UserScript==
// @name     _Anime News Network, remove "This Week in Anime" articles
// @description   Removes "This Week in Anime" articles from animenewsnetwork.com
// @match    *://www.animenewsnetwork.com/*
// @grant    none
// @run-at   document-idle
// @version 0.0.1.20190114124444
// @namespace https://greasyfork.org/users/239478
// ==/UserScript==

(function () {
	'use strict';
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector;
	}

	var getParent = function (node, selector) {
		while (node && node.parentNode) {
			node = node.parentNode;
			if (node.matches(selector)) {
				return node;
			}
		}
	};

	document.querySelectorAll(".thumbnail > a[href*='this-week-in-anime']").forEach(function (v) {
		var node = getParent(v, '.herald.box');
		if (node) {
			node.remove();
		}
	});
})();