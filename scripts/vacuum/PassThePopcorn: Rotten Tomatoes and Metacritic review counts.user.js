// ==UserScript==
// @name        PassThePopcorn: Rotten Tomatoes and Metacritic review counts
// @namespace   xr5p6aa6hwnltb7hzyzi
// @description Shows how many Rotten Tomatoes and Metacritic ratings a movie on PTP has received, and the average Rotten Tomatoes rating. Data is cached for 1 hour.
// @license     MIT
// @match       https://passthepopcorn.me/torrents.php?*id=*
// @connect     rottentomatoes.com
// @connect     metacritic.com
// @version     1.2
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// ==/UserScript==

(function () {
	"use strict";

	// Cache in milliseconds
	const cachePeriod = 3600000;

	// Avoid clashing with site sessionStorage.
	const cachePrefix = "xr5p6aa6hw-";

	// Locate the Rotten Tomatoes and Metacritic sections in the ratings table
	const ratingsTable = document.getElementById("movie-ratings-table");

	if (!ratingsTable) {
		return;
	}

	const rtLogo = ratingsTable.querySelector("img[title='Rotten Tomatoes']");
	const mcLogo = ratingsTable.querySelector("img[title='Metacritic']");

	// Rotten Tomatoes rating present
	if (rtLogo) {
		// Ratings are the next cell over, next to the logo
		const logoCell = rtLogo.closest("td");
		const ratingCell = logoCell.closest("tr").cells[logoCell.cellIndex + 1];

		// URL to fetch
		const url = rtLogo.closest("a").href;

		const cache = cachePrefix + url;

		if (isCacheCurrent(cache)) {
			displayInfo(ratingCell, sessionStorage[cache + "numReviews"], sessionStorage[cache + "avgScore"]);
		} else {
			fetchDocument(url).then((doc) => {
				const result = processRT(doc, cache);
				displayInfo(ratingCell, result.numReviews, result.avgScore);
			});
		}
	}


	// Metacritic rating present
	if (mcLogo) {
		// Ratings are the next cell over, next to the logo
		const logoCell = mcLogo.closest("td");
		const ratingCell = logoCell.closest("tr").cells[logoCell.cellIndex + 1];

		// URL to fetch
		const url = mcLogo.closest("a").href;

		const cache = cachePrefix + url;

		if (isCacheCurrent(cache)) {
			displayInfo(ratingCell, sessionStorage[cache + "numReviews"]);
		} else {
			fetchDocument(url).then((doc) => {
				const result = processMC(doc, cache);
				displayInfo(ratingCell, result.numReviews);
			});
		}
	}


	function isCacheCurrent(key) {
		key += "time";
		return key in sessionStorage && (Date.now() - parseInt(sessionStorage[key], 10)) < cachePeriod;
	}

	// Fetches and parses an HTML document with a Promise API
	function fetchDocument(url) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: "GET",
				url: url,
				anonymous: true,
				onload: (response) => {
					// Resolve with parsed HTML document
					resolve(new DOMParser().parseFromString(response.responseText, "text/html"));
				},
				onerror: (response) => {
					reject(response);
				},
			});
		});
	}


	// Adds info to the ratings table
	function displayInfo(cell, numReviews, avgScore) {
		cell.appendChild(document.createElement("br"));
		cell.appendChild(document.createTextNode("(" + numReviews + ")"));
		if (avgScore !== undefined) {
			cell.appendChild(document.createElement("br"));
			cell.appendChild(document.createTextNode(avgScore));
		}
	}


	// Heavy lifting for Rotten Tomatoes happens here
	function processRT(doc, cache) {
		// Rip and tear the info out of the document
		const script = doc.evaluate("//script[contains(., 'scoreInfo') and contains(., 'avgScore')]", doc, null, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;

		if (!script) {
			return;
		}

		// RIP AND TEAR
		const scoreInfoMatch = script.textContent.match(/\.scoreInfo\s*=\s*({.+});\n/);

		// Parse scoreInfo variable declaration as JSON.
		// Should hopefully work for all cases?
		const scoreInfo = JSON.parse(scoreInfoMatch[1]);

		const numReviews = String(scoreInfo.tomatometerAllCritics.numberOfReviews);
		const avgScore   = String(scoreInfo.tomatometerAllCritics.avgScore);

		// Cache info f'later
		sessionStorage[cache + "numReviews"] = numReviews;
		sessionStorage[cache + "avgScore"]   = avgScore;
		sessionStorage[cache + "time"]       = Date.now();

		return { numReviews, avgScore };
	}


	// Heavy lifting for Metacritic happens here
	function processMC(doc, cache) {
		// Rip and tear the info out of the document
		const script = doc.evaluate("//script[@type='application/ld+json' and contains(., 'aggregateRating')]", doc, null, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;

		if (!script) {
			return;
		}

		// Metacritic embeds this info as JSON already which is nice
		const scoreInfo = JSON.parse(script.textContent);

		const numReviews = String(scoreInfo.aggregateRating.ratingCount);

		// Cache info f'later
		sessionStorage[cache + "numReviews"] = numReviews;
		sessionStorage[cache + "time"]       = Date.now();

		return { numReviews };
	}
})();
