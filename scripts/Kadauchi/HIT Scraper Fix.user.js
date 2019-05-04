// ==UserScript==
// @name         HIT Scraper Fix
// @namespace    https://github.com/Kadauchi
// @version      1.0.0
// @description  Fixes HIT Scraper from sending you to a json response instead of Worker
// @author       Kadauchi
// @icon         http://i.imgur.com/oGRQwPN.png
// @include     /^https://w(ww|orker).mturk.com/.*hit[-_]?scraper$/
// ==/UserScript==

document.addEventListener(`click`, (event) => {
	if (event.target.href && ~event.target.href.indexOf(`.json`)) {
		event.preventDefault();
		window.open(event.target.href.replace(`.json`, ``));
	}
});
