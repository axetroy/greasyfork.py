// ==UserScript==
// @name         Hit Scraper Fix (for JSON issue)
// @namespace    salembeats
// @version      1
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      https://worker.mturk.com/hitScraper
// @include      https://worker.mturk.com/hit_scraper
// @include      https://www.mturk.com/hit-scraper
// @include      https://www.mturk.com/mturk/findhits?match=true&hit_scraper/
// @grant        none
// ==/UserScript==

document.body.addEventListener("click", e => {
	if(e.target.tagName && e.target.tagName.toLowerCase() === "a") {
		if(e.target.href.includes(".json")) {
			e.preventDefault();
			window.open(e.target.href.replace(".json", ""), "_blank");
		}
	}
}, true);