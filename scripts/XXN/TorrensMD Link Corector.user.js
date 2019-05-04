// ==UserScript==
// @name           TorrensMD Link Corector
// @description    Corectarea URL-urilor TMD de pe nume de domenii diferite către acel domeniu pe care deja navighezi
// @include        *torrentsmd.*
// @include        *torrentsmoldova.*
// @version        0.1
// @namespace      https://greasyfork.org/users/3718
// ==/UserScript==

(function ($) {
	var hostname = window.location.hostname;

	$('a[href*="torrentsmd"], a[href*="torrentsmoldova"]').each(function() {
		var curhr = $(this).attr('href');
		$(this).attr('href',
			curhr.replace($(this).prop('hostname'), hostname)
		);
	});

})(jQuery);