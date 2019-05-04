// ==UserScript==
// @name        Liberation anti-blocage
// @namespace   liberation.fr
// @include     http://*liberation.fr/*
// @description Ce script supprime le blocage de la consultation des articles de Liberation après 7 visionnages.
// @version     1.1
// @grant       none
// @run-at document-start
// ==/UserScript==

window.addEventListener('beforescriptexecute', function(e) {
	var el = e.target;
	if (el.src == "" && el.text.indexOf("paywall") != -1) {
		e.stopPropagation();
		e.preventDefault();
		e.target.parentNode.removeChild(e.target);
	}
}, true);