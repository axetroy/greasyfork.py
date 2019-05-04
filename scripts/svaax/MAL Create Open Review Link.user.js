// ==UserScript==
// @name MAL Create Open Review Link
// @description Creates link on anime/manga pages to open specific review on a single page.
// @author svaax@MAL
// @namespace https://greasyfork.org/users/4672
// @version 1.4
// @grant none
// @include http://myanimelist.net/manga*
// @include http://myanimelist.net/anime*
// @include http://myanimelist.net/reviews.php*
// @include http://myanimelist.net/profile/*/reviews
// @exclude http://myanimelist.net/reviews.php?id=*
// ==/UserScript==
(function () {
	$('.reviewDetails, .borderLight').each(function () {
		var a = $(this).parent().find("a:contains(report)");
		if (a.attr("href").length)
		{
			var id = a.attr("href").match(/id=[0-9]+/)[0];
			a.parent()
				.append($('<a class="lightLink" href="/reviews.php?'+ id +'" style="margin-left: 10px">')
					.append($("<small>open</small>")));
		}
	});
})();