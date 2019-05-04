// ==UserScript==
// @name        Hearthis.at: Always show time and make readable
// @namespace   a
// @description Hearthis.at: Always show the time (elapsed/remaining) and make readable (white text on black background)
// @include    https://hearthis.at/embed/*
// @grant       none
// @version 0.0.1.20160713221120
// ==/UserScript==
document.body.onload = loaded;
function loaded(){
	var style = document.createElement("style");
	style.innerHTML = "ul.playlist li div.timing {display:inline-block !important;background:black !important;color:white !important;}";
	document.getElementsByTagName('head')[0].appendChild(style);
}
