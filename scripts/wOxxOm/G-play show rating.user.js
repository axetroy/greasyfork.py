// ==UserScript==
// @name          G-play show rating
// @description   Show the rating as text above the stars in Google Play app listings
// @version       1.0.0
// @author        wOxxOm
// @namespace     wOxxOm.scripts
// @license       MIT License
// @match         https://play.google.com/*
// @run-at        document-start
// @grant         GM_addStyle
// @require       https://greasyfork.org/scripts/12228/code/setMutationHandler.js
// ==/UserScript==

GM_addStyle('.tiny-star span.wxRating { position: absolute; top: -2ex; }');
setMutationHandler('.tiny-star', stars => {
	stars.forEach(star => {
		if (!star.querySelector('.wxRating')) {
			star.insertAdjacentHTML('beforeend', '<span class="wxRating">' +
				star.getAttribute('aria-label').match(/\d\.\d/)[0] + '</span>');
		}
	});
});
