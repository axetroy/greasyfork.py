// ==UserScript==
// @name         Long Click Link
// @description  Open and focus if long click
// @include		 *
// @author       Mattwmaster58
// @version      0.2
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant 		 window.open
// @grant        window.focus
// @license      MIT
// @namespace    https://greasyfork.org/users/107214
// ==/UserScript==

var waitInSeconds = 1, wait = waitInSeconds * 1000, that;

$("[href]").on("mousedown", function () {
	that = this;
	setTimeout(function () {
		console.log($(that).prop("href"));
		window.open($(that).prop("href"));
		//window.focus();
	}, wait);
});
