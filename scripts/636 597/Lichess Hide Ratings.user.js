// ==UserScript==
// @name          Lichess Hide Ratings
// @namespace     http://userstyles.org
// @description   Hides Ratings During Matches
// @author        636597
// @include       *://*lichess.org/*
// @run-at        document-start
// @version       0.1
// ==/UserScript==

function hide_ratings() {
	var sheet = window.document.styleSheets[ 0 ];
	sheet.insertRule( "rating , .players { display: none; }" , sheet.cssRules.length );
}

window.addEventListener ( "load" , hide_ratings );