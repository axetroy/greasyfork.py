// ==UserScript==
// @name         MyAnimeList(MAL) - Average Friends Score
// @version      1.0.7
// @description  Display next to the MAL score, the average score of your friends
// @author       Cpt_mathix
// @include      /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+/
// @include      /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+\/.*/
// @include      *://myanimelist.net/(anime|manga).php?id=*
// @grant        none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

(function($) {
    var url = document.location.href.match(/(^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+\/?[^\/?]*)/)[1];

    $.get(url + '/stats', function(data) {
    	var elements = $($.parseHTML(data)).find('table.table-recently-updated > tbody > tr:nth-child(n) > td:nth-child(2)').not('.borderClass.fw-b.ac');

    	var sum = 0;
    	var count = 0;
    	$(elements).each( function() {
    		var score = $(this).text();
    		if(!isNaN(score)) {
    			sum += parseInt(score);
    			count += 1;
    		}
    	});

    	var averageScore;
    	if (sum > 0) {
    		averageScore = (sum/count).toPrecision(3);
    	} else {
    		averageScore = '-';
    	}

    	var scoreHolder = $('.po-r.js-statistics-info.di-ib');
    	var newElement = document.createElement('div');
    	$(newElement).html('<span class="dark_text">Friend Score:</span> ' + averageScore);
    	$(newElement).addClass('spaceit');
    	$(newElement).attr('style', 'padding-top: 0px; padding-bottom: 0px; margin-bottom: 0px; margin-top: 5px;');

    	$(newElement).insertAfter(scoreHolder[0]);
    	$(scoreHolder[1]).attr('style', 'padding-top: 0px; margin-top: 2px');
    });
})(jQuery);