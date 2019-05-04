// ==UserScript==
// @name Remove Patreon(Text-48) Widget
// @namespace ew0345
// @description Removes the patreon users widget on the side of the wuxiaworld BTTH page because it breaks firefox's reader mode.
// @include http://www.wuxiaworld.com/btth-index/*
// @grant none
// @version v1.1
// @icon http://i.imgur.com/8Jv6GOz.png
// @homepageURL https://www.youtube.com/ew0345
// ==/UserScript==

function removeWidget() {
	var widget = document.getElementById('text-48');
	if (typeof widget !== "undefined") {
		widget.remove();
	} else {
		console.log('Widget is undefined');
	}
}
removeWidget();