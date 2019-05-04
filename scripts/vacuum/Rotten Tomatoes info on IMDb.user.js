// ==UserScript==
// @name        Rotten Tomatoes info on IMDb
// @namespace   k226zzno1ibma5mvtmxc
// @version     1.0
// @description Fetches review count and average review score from Rotten Tomatoes
// @license     MIT
// @include     https://www.imdb.com/title/tt*
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @connect     www.omdbapi.com
// @connect     rottentomatoes.com
// @run-at      document-start
// ==/UserScript==

(function () {
	"use strict";

	let apiKey = GM_getValue("apiKey");

	if (!apiKey) {
		apiKey = prompt("Please enter your OMDb API key to use this userscript, or hit cancel if you need to sign up for one.");

		if (!apiKey) {
			if (apiKey === null) {
				location.href = "https://www.omdbapi.com/apikey.aspx";
			}
			return;
		} else {
			GM_setValue("apiKey", apiKey);
		}
	}

	apiKey = encodeURIComponent(apiKey);

	const id = location.pathname.match(/^\/title\/(tt\d{7})/)[1];

	// Cache data in milliseconds
	const cachePeriod = 3600000;
	const cachePrefix = `k226zzno1i-${id}-`;

	function cacheGet(key) {
		return sessionStorage[`${cachePrefix}${key}`];
	}

	function cacheSet(key, value) {
		sessionStorage[`${cachePrefix}${key}`] = value;
	}

	function isCacheCurrent(key) {
		const time = cacheGet(key);
		return time && (Date.now() - parseInt(time, 10)) < cachePeriod;
	}


	function queueTheTomato(url) {
		// Proceed if/when page is ready
		if (document.readyState === "loading") {
			window.addEventListener("DOMContentLoaded", () => {
				addTheTomato(url);
			});
		} else {
			addTheTomato(url);
		}
	}

	function addTheTomato(url) {
		const link = document.createElement("a");
		link.target = "_blank";
		link.rel = "noopener";
		link.referrerPolicy = "no-referrer";
		link.title = "View on Rotten Tomatoes";
		link.href = url;
		link.appendChild(document.createTextNode("\uD83C\uDF45")); // tomato emoji

		// Spacer
		const spacer = document.createElement("span");
		spacer.className = "ghost";
		spacer.textContent = "|";

		// Add it to the subtext line
		const subtext = document.getElementsByClassName("subtext")[0];
		if (subtext) {
			subtext.appendChild(spacer);
			subtext.appendChild(link);
		}

		// Scrape ratings data from Rotten Tomatoes (or cache)
		if (isCacheCurrent("rtTime")) {
			link.appendChild(document.createTextNode(` ${cacheGet("rtAverage")} (${cacheGet("rtNumReviews")})`));
		} else {
			GM_xmlhttpRequest({
				method: "GET",
				anonymous: true,
				url: url,
				onload: (response) => {
					const doc = new DOMParser().parseFromString(response.responseText, "text/html");
					// Scrape info from script tags
					const script = doc.evaluate("//script[contains(., 'scoreInfo') and contains(., 'avgScore')]", doc, null, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;

					if (!script) {
						return;
					}

					// RIP AND TEAR
					const scoreInfoMatch = script.textContent.match(/\.scoreInfo\s*=\s*({.+});\n/);

					// Parse scoreInfo variable declaration as JSON.
					const scoreInfo = JSON.parse(scoreInfoMatch[1]).tomatometerAllCritics;

					// Cache data
					cacheSet("rtTime", Date.now());
					cacheSet("rtAverage",    scoreInfo.avgScore);
					cacheSet("rtNumReviews", scoreInfo.numberOfReviews);

					link.appendChild(document.createTextNode(` ${scoreInfo.avgScore} (${scoreInfo.numberOfReviews})`));
				}
			});
		}
	}


	// Get Rotten Tomatoes movie alias from cache or OMDb API
	if (isCacheCurrent("omdbTime")) {
		queueTheTomato(cacheGet("rtURL"));
	} else {
		GM_xmlhttpRequest({
			method: "GET",
			anonymous: true,
			url: `https://www.omdbapi.com/?apikey=${apiKey}&tomatoes=true&i=${encodeURIComponent(id)}`,
			onload: (response) => {
				const json = JSON.parse(response.responseText);
				if (json && json.tomatoURL) {
					let url;
					try {
						// Check if URL is valid
						url = new URL(json.tomatoURL);
					} catch (ignore) {
						return;
					}

					// Cache data
					cacheSet("rtURL",    url.href);
					cacheSet("omdbTime", Date.now());

					queueTheTomato(url.href);
				} else if (json && json.Error) {
					console.log(`Error: " + ${json.Error}`);
				}
			}
		});
	}
})();
