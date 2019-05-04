// ==UserScript==
// @name         GGn :: Bah Humbug
// @namespace    https://greasyfork.org/en/scripts/375582-ggn-bah-humbug
// @version      1.0
// @description  Clicks every Dislike link on every forum thread page visited.
// @author       newstarshipsmell
// @include      /https://gazellegames\.net/forums\.php\?action=viewthread/
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	var dislikes = document.querySelectorAll('tr.likes > td:nth-of-type(1) > a:nth-of-type(2)');
	for (var i = 0, len = dislikes.length; i < len; i++) {
		dislikes[i].click();
	}
})();