// ==UserScript==
// @name          Lichess Hide Usernames
// @namespace     http://userstyles.org
// @description   Hides Usernames During Matches
// @author        636597
// @include       *://*lichess.org/*
// @run-at        document-start
// @version       0.1
// ==/UserScript==

function hide_usernames() {
	var sheet = window.document.styleSheets[ 0 ];
	sheet.insertRule( "div.username * { display: none; }" , sheet.cssRules.length );
	sheet.insertRule( ".user { display: none; }" , sheet.cssRules.length );
}

window.addEventListener ( "load" , hide_usernames );