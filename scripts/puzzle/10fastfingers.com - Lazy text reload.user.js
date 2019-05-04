// ==UserScript==
// @name         10fastfingers.com - Lazy text reload
// @namespace    10fastfingers.com
// @version      0.2.3
// @description  Assigns text reload to the tilde('~') button
// @author       Puzzle
// @match        https://10fastfingers.com/typing-test/*
// @match        https://10fastfingers.com/advanced-typing-test/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	var btn = document.querySelector('#reload-btn');
	if (!btn) return;
	document.addEventListener('keydown', function q(e) {
		if (e.keyCode == 192) {
			e.preventDefault();
			btn.click();
		}
	},true);
})();