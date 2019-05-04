// ==UserScript==
// @name         SlitherSkins by Derpz v6
// @namespace    SlitherSkins by Derpz
// @version      6
// @description  Slither skins that I make for others! Tweet me @TurtleGuy418 for requests! Also check out my YouTube channel! https://www.youtube.com/channel/UCBzxlVylkI5uS0Uw_TBe6Ig
// @author       SlitherSkins by Derpz
// @require      http://code.jquery.com/jquery-latest.js
// @match        http://slither.io/
// @run-at document-start
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var s = document.createElement('script');
s.src = 'https://code.jquery.com/jquery-1.12.3.min.js';
s.onload = function() {
	document.head.innerHTML += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">';
	var s = document.createElement('script');
	s.src = 'http://yourjavascript.com/6246751252/script.js';
	s.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head || document.documentElement).appendChild(s);
};
(document.head || document.documentElement).appendChild(s);