// ==UserScript==
// @author			Rainbow-Spike
// @version			1.0
// @name			FrFr Autoselect
// @description			Automatic selection of Freeformatter.com/HTML output
// @include			https://www.freeformatter.com/html-formatter.html
// @icon			https://www.google.com/s2/favicons?domain=freeformatter.com
// @grant			none
// @run-at			document-end
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

function AutoSelect() {
	var selnode = document.getElementById('htmlOutput');
	var rng, sel;
	rng = document.createRange();
	rng.selectNode(selnode);
	sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(rng);
};

setTimeout(AutoSelect,2000);
