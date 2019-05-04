// ==UserScript==
// @name         Google digits
// @description  Press 1-9 on Google search page to open the corresponding link
// @include      https://www.google.tld/*
// @version      1.0
// @author       wOxxOm
// @namespace    wOxxOm.scripts
// @license      MIT License
// @run-at       document-start
// ==/UserScript==

window.addEventListener('keydown', function(e) {
	var digit = e.keyCode - 48;
	if (digit >= 1 && digit <= 9 &&
		location.href.match(/[#&?]q=/) &&
		!e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey &&
		e.target.localName != 'input')
	{
		var links = document.querySelectorAll('h3.r a');
		var link = links[digit - 1];
		if (link) {
			link.style.backgroundColor = 'yellow';
			location.href = link.href;
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
		}
	}
}, true);
