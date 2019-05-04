// ==UserScript==
// @name MAL Report Recommendation Links Fix
// @description Fix broken recommendation link on users profiles.
// @author svaax@MAL
// @namespace https://greasyfork.org/users/4672
// @version 1.2
// @license GPL v3
// @include http://myanimelist.net/profile/*/recommendations
// ==/UserScript==

(function () {
	$('.lightLink a:contains(report)').each(function () {
		this.href = '/dbchanges.php' + this.search;
	});
})();