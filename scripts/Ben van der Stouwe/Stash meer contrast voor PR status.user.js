// ==UserScript==
// @name     Stash meer contrast voor PR status
// @description Zorgt ervoor dat het PR overzicht in Stash meer contrast toont.
// @namespace TZ
// @version  1
// @match    https://stash.topicus.nl/*
// @author   Peter Simonis
// @grant    none
// @licence  GNU GPL
// ==/UserScript==
(function () {
	myFunction1();
	function myFunction1() {
		changeBackgroundColor('button[data-build-status="SUCCESSFUL"]','green');
		changeBackgroundColor('button[data-build-status="INPROGRESS"]','blue');
		changeBackgroundColor('button[data-build-status="FAILED"]', 'red');
		changeBackgroundColor('.conflicted', 'orange');
	}
	function changeBackgroundColor(selector, color) {
		[].forEach.call(document.querySelectorAll(selector), function (el) {
			el.parentNode.parentNode.style.backgroundColor = color;
		});
	}
})();