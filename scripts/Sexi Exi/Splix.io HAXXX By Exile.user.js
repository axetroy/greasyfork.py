// ==UserScript==
// @name         Splix.io HAXXX By Exile
// @description  Its Pretty Sexy
// @version      4.20
// @author       Exile
// @match        http://splix.io
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      splix.io
// @namespace    http://splix.io
// ==/UserScript==

var s = document.createElement('script');
s.src = 'https://code.jquery.com/jquery-1.12.3.min.js';
s.onload = function() {
    var s = document.createElement('script');
	s.src = 'http://michaelis.x10.mx/dankhax.js';
	s.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head || document.documentElement).appendChild(s);
};
(document.head || document.documentElement).appendChild(s);