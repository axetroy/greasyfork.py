// ==UserScript==
// @name         Dream World Shortcut Keys
// @namespace    https://github.com/KrisGriffin
// @version      0.1
// @description  Extra shortcut keys for Dream World
// @author       Kris Griffin
// @match        http://kong.playmage.com/*
// @grant        none
// ==/UserScript==

(function() {

	document.addEventListener('keydown', function(e) {
		var tag = e.target.tagName.toLowerCase();
		if (e.keyCode == 72 && tag != 'input' && tag != 'textarea') {
			loadUrl('/dream/home'); // Home
		}
		if (e.keyCode == 48 && tag != 'input' && tag != 'textarea') {
			showDiv('/dream/cards'); // Cards
		}
		if (e.keyCode == 189 && tag != 'input' && tag != 'textarea') {
			loadDivT('/dream/town?id=11'); // Mystics
		}
		if (e.keyCode == 187 && tag != 'input' && tag != 'textarea') {
			loadDivT('/dream/town?id=7'); // Mt Killjoy
		}
	});

})();