// ==UserScript==
// @name        FIMFiction - Total Views
// @namespace   Selbi
// @include     http*://*fimfiction.net/index.php?view=category&user=*
// @include     http*://*fimfiction.net/stories*
// @version     1
// @grant       none
// @description Displays the total number of story views and words on a user's story overview. [ONLY WORKS IN "LIST VIEW"!!!]
// ==/UserScript==

var totalviews = 0;
var totalwords = 0;

$(".story-list .info").each(function(){
	var infotext = $(this).html();
	var views = infotext.substring(infotext.indexOf("</b>") + 10, infotext.indexOf(" views")).replace(",","");
	var words = infotext.substring(5, infotext.indexOf(" words")).replace(",","");
	totalviews += parseInt(views);
	totalwords += parseInt(words);
});

if (totalviews > 0 || totalwords > 0) {
	$("div.search_results_count").append('<div style="text-align:center;font-style:italic;">Total Views: ' + commaNumber(totalviews) + " <b>·</b> Total Words: " + commaNumber(totalwords) + "</div>");
}

function commaNumber(int) {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}