// ==UserScript==
// @name          Lichess Hide Watchers Area
// @namespace     http://userstyles.org
// @description   Hides Watchers Area During Matches
// @author        636597
// @include       *://*lichess.org/*
// @run-at        document-start
// @version       0.3
// ==/UserScript==

function hide_watchers_area() {
	var sheet = window.document.styleSheets[ 0 ];
	//sheet.insertRule( "div.watchers * { display: none; }" , sheet.cssRules.length );
	sheet.insertRule( "div.under_chat * { display: none; }" , sheet.cssRules.length );
}

window.addEventListener ( "load" , hide_watchers_area );