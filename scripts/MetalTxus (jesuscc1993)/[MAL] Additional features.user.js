// ==UserScript==
// @name         [MAL] Additional features
// @description  Adds image and torrent search for each anime / manga entry, removes search results already on the user's list and removes a few adds.
// @version      1.1.0
// @author       MetalTxus

// @include      https://myanimelist.net/topanime.php?*
// @include      https://myanimelist.net/topmanga.php?*
// @include      https://myanimelist.net/anime*
// @include      https://myanimelist.net/manga*

// @icon         https://dl.dropbox.com/s/8m20m7iqc5bz1ke/mal.png
// @namespace    https://greasyfork.org/users/8682
// ==/UserScript==

(function() {
    'use strict';

	var MEDIA_TYPE = {
        anime: { id: '1_2', label: 'anime' },
        manga: { id: '3_1', label: 'manga'}
    }, CSS =
        '<style>' +
            '.custom-search-wrapper a { text-decoration: none; font-size: 16px; transition: .3s;}' +
            '.custom-search-wrapper a:hover { color: rgba(80,116,200,.9); }' +
            '.fa-magnet::before { content: "\\f076" }' +
            '.fa-picture-o::before { content: "\\f03e" }' +
        '</style>';

	function removeResultsInOwnList () {
		$('.ranking-list .btn-anime-watch-status:not(.notinmylist)').parents('.ranking-list').remove();
		$('.js-block-list [title="Completed"],' +
		  '.js-block-list [title="Dropped"],' +
		  '.js-block-list [title="Plan to Watch"]'
		 ).parents('.js-seasonal-anime, tr').remove();
	}

	function addLinkToSearch () {
		$('#contentWrapper h1 span[itemprop="name"]').each(function (i, element) {
			element = $(element);

			var mediaType = location.href.indexOf('https://myanimelist.net/anime') > -1 ? MEDIA_TYPE.anime : MEDIA_TYPE.manga,
				title = element.text();

            var searchWrapper = $('<span class="custom-search-wrapper"></span>');

            var picturesAnchor = $('<a href="https://www.google.es/search?tbm=isch&q=' + encodeURI(title) + ' ' + mediaType.label + '"></a>');
            var picturesIcon = $('<i class="fa fa-picture-o" title="Search for pictures"></i>');
            appendSearchAnchor(searchWrapper, picturesAnchor, picturesIcon);

            var torrentAnchor = $('<a href="https://nyaa.si/?f=0&s=seeders&o=desc&c=' + mediaType.id + '&q=' + encodeURI(title) + '"></a>');
            var torrentIcon = $('<i class="fa fa-magnet" title="Search for torrents"></i>');
            appendSearchAnchor(searchWrapper, torrentAnchor, torrentIcon);

            var hsAnchor = $('<a href="https://nyaa.si/?f=0&s=seeders&o=desc&c=' + mediaType.id + '&q=' + encodeURI(title) + " [HorribleSubs] 720" + '"></a>');
            var hsIcon = $('<i class="fa fa-header" title="Search for HorribleSubs torrents"></i>');
            appendSearchAnchor(searchWrapper, hsAnchor, hsIcon);

			element.append(searchWrapper);
		});
	}

    function appendSearchAnchor (container, anchor, icon) {
        anchor.append(icon);
        container.append(' ', anchor);
    }

    function removeAdds () {
        $('[href^="/membership?"]').each(element => $(element).parents('div').eq(0).remove());
        $('._unit').each(element => $(element).remove());
    }

    $(CSS).appendTo('head');
    setTimeout(removeAdds, 1000);
	removeResultsInOwnList();
	addLinkToSearch();
})();