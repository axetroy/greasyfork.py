// ==UserScript==
// @name         MAL2KissAnime
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Tries to find KissAnime Links from the MAL Title and display them on MAL
// @author       pilar6195
// @require      https://code.jquery.com/jquery-1.12.3.min.js
// @match        http://myanimelist.net/anime/*
// @match        http://myanimelist.net/anime.php?id=*
// @connect      kissanime.to
// @grant        GM_xmlhttpRequest
// ==/UserScript==
///////////////
// CHANGELOG //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// -- 0.1 --																																		//
// - Initial version																																//
// -- 0.2 --																																		//
// - Changed from using "/Search/Anime" to "/Search/SearchSuggest"																					//
// -- 0.3 --																																		//
// - Renamed "cfCookieExpired" to "cfCookieExist"																									//
// - Removed unnecessary code																														//
// -- 0.4 --																																		//
// - Now uses "English", "Synonyms", and "Japanese" Titles to search. Now it should return results for Anime that didn't before (on 0.3 or lower).	//
// - Added "Searching..." text.																														//
// -- 0.5 --																																		//
// - Added Firefox check																															//
// - Fixed script not working when the user was not logged into MAL																					//
// -- 0.6 --																																		//
// - Changed from using HTTPS to HTTP   																											//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

jQuery(document).ready(function() {
	jQuery('h2:contains("Statistics")').before('<div id="kissAnimeLinks"><h2>KissAnime Links</h2><div id="searching">Searching...</div></div><br>');
	var AnimeTitles = ( (  [jQuery('#contentWrapper > div:first-child span').text()].concat( find('English:') ) ).concat( find('Synonyms:') ) ).concat( find('Japanese:') ); // Merges all the titles into one array
	var i = 0;
	doRequest();
	function doRequest() {
		GM_xmlhttpRequest({
			method: "POST",
			data: 'type=Anime' + '&keyword=' + AnimeTitles[i],
			url: 'http://kissanime.to/Search/SearchSuggest',
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			onload: function(response) {
				var cfCookieExist = (jQuery(response.response).find('.cf-browser-verification').length ? false : true);
				var hasResponse;
                if (typeof InstallTrigger !== 'undefined') hasResponse = (response.response !== '' ? true : false); // Firefox check
                else hasResponse = (response.response !== undefined ? true : false);
            	if (cfCookieExist === true) {
					if (hasResponse === true) {
						jQuery(response.response).each(function(index, value) {
							jQuery('#searching').remove();
							jQuery('#kissAnimeLinks').append(value).append('<br>');
						});
					} else {
						i++; if (i < AnimeTitles.length) doRequest();
						else {
							jQuery('#searching').remove();
							jQuery('#kissAnimeLinks').append('<div>Could not find any results.</div>');
						}
					}
				} else {
					jQuery('#searching').remove();
					jQuery('#kissAnimeLinks').append("<div>Could not reach <a href='https://kissanime.to/'>KissAnime.to</a>. This probably means the CloudFlare cookie exipred or doesn't exist. Visit <a href='https://kissanime.to/'>KissAnime.to</a> then try again.</div>");
				}
			}
    	});
	}
});

function find(a) {
	return jQuery('.dark_text:contains('+a+')').parent().text().replace(a ,'').trim().split(', ');
}