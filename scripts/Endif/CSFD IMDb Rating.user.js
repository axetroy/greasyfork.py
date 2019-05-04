// ==UserScript==
// @name        CSFD IMDb Rating
// @namespace   http://csfd.cz
// @description Zobrazí v profilu filmu hodnocení z IMDb.
// @match       http://www.csfd.cz/film/*
// @match       https://www.csfd.cz/film/*
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @connect     www.imdb.com
// @domain      www.imdb.com
// @version     0.5
// ==/UserScript==

// CHANGES
// -------
// 0.5 - úprava kvůli změně IMDb stránek
// 0.4 - GM_* funkce nahrazeny novými kvůli změně API v GreaseMonkey 4.0+
// 0.3 - upravena hlavička skriptu kvůli přechodu ČSFD na https
// 0.2 - úprava kvůli změně IMDb stránek
// 0.1 - první verze

$ = this.jQuery = jQuery.noConflict(true);

var movieURL = $("ul.links:last li:last a").attr("href").trim();

GM.xmlHttpRequest({
	method: "GET",
	url: movieURL,
	onload: function(response) {
		var rating = $(response.responseText).find(".ipl-rating-star__rating").first().text().trim();

		if (rating.length > 0) {
			rating = rating.replace(",", "") + "%";

			$(".average").append(" <span style=\"color:black\" title=\"Hodnocení na IMDb\">" + rating + "</span>");
		}
	}
});
