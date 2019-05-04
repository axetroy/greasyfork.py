// ==UserScript==
// @name businessinsider anti-adblock bypass
// @namespace http://jamesswandale.com/
// @version 0.1
// @description bypass anti-adblock message
// @match http://*.businessinsider.com/*
// @copyright 2017+, James Swandale
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


$(document).ready(function() {
	document.getElementsByClassName("responsive visible")[0].style = "overflow-y:scroll";
	document.getElementsByClassName("fc-dialog-overlay")[0].remove();
	document.getElementsByClassName("fc-root fc-dialog-container")[0].remove();
});