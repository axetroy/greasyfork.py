// ==UserScript==
// @name           Kill Floating Bars
// @namespace      https://greasyfork.org/en/scripts/371-kill-floating-bars/
// @description    Stops elements from following you as you scroll down the page
// @include        *
// @version        2
// ==/UserScript==

// Original namespace was http://userscripts.org/scripts/show/123194
var i;
var all = document.getElementsByTagName("*");
for(i = 0; i < all.length; i++) {
	var style = window.getComputedStyle(all[i]);
	var positioning = style.position;
	if ((positioning == 'absolute') || (positioning == 'fixed')) {
		all[i].style.position = 'static';
	}
}
