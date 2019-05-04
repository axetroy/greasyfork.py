// ==UserScript==
// @name Kinozal.tv/me/guru | Torrent/Magnet кнопки в поисковой системе/раздачи персоны.
// @name:en Kinozal.tv/me/guru | Torrent + Magnet buttons in search page/person page.
// @description Добавляет кнопку "Скачать раздачу" и "Скачать через Magnet" в "Поисковой системе" и "Раздачи персоны" для быстрого скачивания. / [Скачать через Magnet - Актуально тем, кто недавно зарегистрирован и кто хочет скачать без учёта рейтинга/скачивания.] (Фото внутри)
// @description:en Adds a download button Torrent and Magnet in search page/person page. (Photo inside) / [Download with Magnet - Actually those who are newly registered and who want to download without taking into account the rating/download]
// @namespace none
// @version 0.3.6
// @author https://greasyfork.org/scripts/40843
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAMAAAD+iNU2AAAAD1BMVEU7R4CAAAD4+/z9787///8A0Su5AAAASUlEQVR4AXWPAQrEMBACzen/33wdkGILFZQdSFxWkZKoyWBsd5JXvFgMfC6ZLBs0pq8Mtq8f0Bcbw9N3HvuI8i14sAt/e8/73j/4FwHuDyR5AQAAAABJRU5ErkJggg==

// == Search page ==
// @match *://kinozal.tv/browse.php*
// @match *://kinozal.me/browse.php*
// @match *://kinozal.guru/browse.php*

// == Person page ==
// @match *://kinozal.tv/persons.php*
// @match *://kinozal.me/persons.php*
// @match *://kinozal.guru/persons.php*
// ==/UserScript==

$(function() {
	// Download magnet button
	var css = '.btnDownloadMagnet {display:inline-block;width: 32px;height:32px;background-image: url(data:image/png;base64,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);background-size: 32px 32px;}',
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	head.appendChild(style);
	var table = $('.t_peer');
	var h = table.find('.mn');
	h.prepend('<td class="z"></td>');
	table.find('tr').not(h).each(function(i, e) {
		var td = document.createElement('td');
		$(e).prepend(td);
		var url = $(e).find('.nam a').attr('href');
		var uArgs = url.split('?')[1].split('&');
		// Find torrent id.
		var id = null;
		uArgs.forEach(function(el) {
			if (el.startsWith('id=')) {
				id = el.split('=')[1];
			}
		});
		if (id !== null) {
			var a = document.createElement('a');
			a.className = 'btnDownloadMagnet';
			$.get('/get_srv_details.php?id=' + id + '&action=2', function(s) {
				var result = new RegExp('Инфо хеш: (.\{40\})').exec(s);
				var hash = result[1];
				a.title = "Скачать через Magnet";
				a.href = 'magnet:?xt=urn:btih:' + hash;
			});
			td.appendChild(a);
		}
	});
	// Download torrent button
	var css = '.btnDownloadTorrent {display:inline-block;height:32px;width:32px;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAByFBMVEWxQEqyQEqzQEqyQEqzQEqzQEqxQEqzQEqxQEqxQEqzQEqzQEqxQEqzQEqzQEqzQEqxQEqzQEqxQEqxQEqxQEqxQEqxQEqxQEqxQEqxQEqxQEqxQEqyQEqxQEqxQEqxQEqzQEqxQEqyQEqxQEqxQEqzQEqzQEqzQEqxQEqzQEqzQEqzQEqzQEqzQEqzQEqzQEqzQEqzQEqzQEqzQEqxQEqxQEqxQEqxQEqzQEqzQEqzQEqzQEqzQEqzQEqzQEqyQEqxQEqxQEqzQEqzQEqzQEqxQEqxQEqzQEqzQEqzQEqxQEqzQEqxQEqzQEqxQEqxQEqzQEqzQEqxQEqzQEqzQEqzQEqzQEqxQEqzQEqxQEqxQEqzQEqzQEqxQEqzQEqzQEqzQEqxP0mwP0mxQEqzQEqxQEqzQEqzQEqxPEazP0mzQEqzQEqzQEqzQEqxP0mzQEqxP0mzQEqzQEqzQEqvPEazQEqzQEqvPEazQEqvPEaxQEqzQEqvPEazQEqzQEqtOUSuOkSxQEqyP0mzQEqzQ02zRE21RE61RU68VV28Vl29Vl69V1++Vl7LcnfMcnjQe3/RfYHrr67rsK/rsbDutLPutrTvtrTvt7UZXiGPAAAAf3RSTlMAAAABAQMEBAUGBggJCQoLDAwQERITGBweICIjIyQlJiYnJygpKi4vPT5BQ0VGSUtRVVZXWFxdX2FrbG9ydXaPqKm5vL2+wcTGyMrLzM3Oz9HT1NTY2dzd3d7f4OPk5Obn6Orq6uvr7O3t7e/w8vPz9PT19vf3+Pn5+vr6+/v+c8BdKAAAAYlJREFUeNrd0mVTwzAYwPEnD86Gu9uw4e5uw4e7+waMDYZbCTacDtjXJWWltLfjLS/4vWgvyf+Su7SAmY3GbVfGZV02CkC7Syf6BlwcUXpS+BW00RqVuxMbuovceg7r6Gm5EGwYVOxFCEH0qslFJwI9XHjRKa1kgXkmgD0hQwOYSru/11mQRAr2aS2CaTaITURwHUDSaKdzMxCCFMA8E60Qg3iuH0gi1SEKq2JAMOdoUgp62Tg/nYCoi9OwCY/pbTGI4sbDfLwJ+IhCR7gYFvhPm8XAs4VbGpNZ4Fq9ZQECRNRPLchMNUQC4E8gHK0OlFEDAJEFCOAK/11AABKKS2WKk5T3AFCyeX4mc75VJr9JAsFzl48vz5KXp6v5EMXHij+4fXN8SBzvd8caRRC3Y3vlXyU8f7+X8ncB++1/D/wmLWBaUSGS6B0bb+cldvv9XgJB9F00g45W+yLGuu6QzNaraDtk7dNRvX7w4vpB4eZiSK8fpic5gNomo9VqMaytKqwZLFbrenMWfgLz5ebyGVZSBwAAAABJRU5ErkJggg==);background-size: 32px 32px;}',
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	head.appendChild(style);
	var table = $('.t_peer');
	var h = table.find('.mn');
	h.prepend('<td class="z"></td>');
	table.find('tr').not(h).each(function(i, e) {
		var td = document.createElement('td');
		$(e).prepend(td);
		var url = $(e).find('.nam a').attr('href');
		var uArgs = url.split('?')[1].split('&');
		// Find torrent id.
		var id = null;
		uArgs.forEach(function(el) {
			if (el.startsWith('id=')) {
				id = el.split('=')[1];
			}
		});
		if (id !== null) {
			// Create button
			var a = document.createElement('a');
			a.className = 'btnDownloadTorrent';
			a.title = "Скачать торрент";
			a.href = '/download.php?id=' + id;
			td.appendChild(a);
		}
	});
});