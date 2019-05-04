// ==UserScript==
// @name         Reddit Peloton profile linkifier
// @namespace    http://www.tampermonkey.com
// @version      0.1
// @description  Turns the text of flair in reddit.com/r/pelotoncycle into links to Peloton Cycle / One Peloton profiles
// @author       Matt Taylor
// @match        *://*.reddit.com/r/pelotoncycle*
// @require      https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=122976
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	waitForElems('span.flair', function(flair) {
		flair.innerHTML = flair.textContent.split(' ').map(function(segment) {
			if (segment.match('')) {
				return '<a href=https://www.onepeloton.com/profile/' + segment + ' target="_blank" rel="noopener noreferrer">' + segment + '</a>';
			} else {
				return segment;
			}
		}).join(' ');
	});
})();
