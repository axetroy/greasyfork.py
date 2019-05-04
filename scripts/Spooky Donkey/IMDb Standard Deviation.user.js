// ==UserScript==
// @name         IMDb Standard Deviation
// @namespace    http://userscripts.org/users/7063
// @include      https://www.imdb.com/title/tt*/ratings
// @include      https://www.imdb.com/title/tt*/ratings-*
// @include      https://www.imdb.com/title/tt*/ratings?*
// @version      2019.1.1.21.17
// @grant        none
// @description  Adds standard deviation to IMDb ratings breakdown pages.
// ==/UserScript==

/*eslint-env browser*/

"use strict";

(function () {
	const main = document.querySelector("#main");
	if (main) {
		const votes = [...main.querySelector("table").rows].slice(1)
			.map(k => +k.cells[2].textContent.replace(/[\s,]/g, ""));
		const [product, votecount] = votes.reduce(([p, v], c, i) => [p + c * (10 - i), v + c], [0, 0]);
		const sumOfSquares = votes.reduce((p, c, i) => p + Math.pow(10 - i - product / votecount, 2) * c, 0);
		main.querySelector("table ~ .allText").textContent += `\xA0 Standard Deviation = ${
			Math.sqrt(sumOfSquares / (votecount - 1)).toFixed(2)}`;
	}
}());
