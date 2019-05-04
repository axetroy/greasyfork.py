// ==UserScript==
// @name        Duolingo Scroller
// @description Scrolls to the last completed checkpoint when the Home page loads.
// @version     1.0
// @namespace   Dimethyl
// @include     /^https://www\.duolingo\.com/.*$/
// @grant       none
// ==/UserScript==

function onDocumentReady() {
	if (window.location.href !== 'https://www.duolingo.com/') return;
	var $lastCompleted = $('li.row-shortcut span.icon-check-white-small').last();
	if ($lastCompleted.length !== 1) return;
	$lastCompleted[0].scrollIntoView(true);
}

$(function() {
	setTimeout(onDocumentReady, 0);
	$(document).ajaxSuccess(function() { setTimeout(onDocumentReady, 0); });
});