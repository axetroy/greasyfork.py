// ==UserScript==
// @name         MyAnimeList(MAL) - Show User Statistics on Reviews
// @version      1.0.0
// @description  View some extra statistics about the reviewer like mean score, affinity and shared anime/manga.
// @author       Cpt_mathix
// @include      /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+\/?/
// @include      /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+\/.+\/?/
// @include      /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+\/.+\/reviews/
// @include      *://myanimelist.net/(anime|manga).php?id=*
// @exclude      /^https?:\/\/myanimelist\.net\/(anime|manga)\/[^0-9]+/
// @exclude      /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+\/.+\/(?!reviews)[^\s]/
// @grant        none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

var type = /http.*:\/\/myanimelist\.net\/anime\/\d+/.test(document.location.href) ? "anime" : "manga";

main();

function main() {
	var reviews = document.getElementsByClassName('borderDark');

	for (var x = 0; x < reviews.length; x++) {
		var anchor = reviews[x].querySelector('div.mb8');
		if (anchor) {
			anchor.insertAdjacentHTML("beforeend", "<div id=\"review-" + x + "\" class=\"spaceit lightBox calculate-stats\"><a href=\"javascript:;\">Show User Stats</a></div>");
			anchor.addEventListener("click", getUserProfile.bind(this, reviews[x], x));
		}
	}
}

function calculateStats(data, nb) {
	var score = data.querySelector("#statistics ." + type + " .stat-score > div:nth-child(2)").textContent;
	var affinity_negative = data.querySelector(".user-compatability-graph > .bar-outer." + type + " > .bar-outer-negative");
	var affinity_positive = data.querySelector(".user-compatability-graph > .bar-outer." + type + "  > .bar-outer-positive");
	var affinity = "?";
	if (affinity_negative && affinity_positive ) {
		affinity = affinity_positive.textContent.trim() == "0%" ? affinity_negative.textContent.trim() : affinity_positive.textContent.trim();
		affinity = affinity.indexOf("--") >= 0 ? affinity.replace("-", "") : affinity;
	}
	var shared = data.querySelector(".user-compatability-graph > div:nth-child(" + ((type == "anime") ? 1 : 3) + ") > span.user-compatability-data").textContent;
	var ptw = data.querySelector("#statistics ." + type + " .stats-status .plan_to_" + ((type == "anime") ? "watch" : "read") + "").nextElementSibling.textContent;
	var total = data.querySelector("#statistics ." + type + " .stats-data > li > span:nth-child(2)").textContent;
	var completed = parseInt(total.replace(/,/g, "")) - parseInt(ptw);

	var anchor = document.getElementById("review-" + nb);
	anchor.innerHTML = "<div>" + score + "</div><div class=\"lightLink\" style=\"padding-top:3px;margin-top:3px\">" + ((type == "anime") ? "Watched Anime" : "Read Manga") + ": " + completed + ", " + shared + " - Affinity: " + affinity + "</div>";
}

function getUserProfile(review, nb) {
	var url = review.querySelector('table > tbody > tr > td:nth-child(2) > a').href;

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var container = document.implementation.createHTMLDocument().documentElement;
			container.innerHTML = xhr.responseText;
			calculateStats(container, nb);
		}
	};
	xhr.open("GET", url, false);
	xhr.send();
}