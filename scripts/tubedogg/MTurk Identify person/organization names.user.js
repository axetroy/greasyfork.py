// ==UserScript==
// @name        MTurk Identify person/organization names
// @namespace   http://idlewords.net
// @include     https://www.mturkcontent.com/dynamic/hit*
// @version     1.01
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant       none
// @description Adds keyboard shortcuts to "Identify person name" HITs by Kara Greenfield
// ==/UserScript==

$.noConflict();
if ($("span:contains('entity mentions')").length) {
	$(document).keydown(function(event) {
		if (event.which == 65 && event.ctrlKey) {
			$("#addentity").click();
		} else if (event.which == 83 && event.ctrlKey) {
			$("#submitButton").click();
		}
	});
}