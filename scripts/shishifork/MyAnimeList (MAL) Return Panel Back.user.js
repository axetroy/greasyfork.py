// ==UserScript==
// @name		MyAnimeList (MAL) Return Panel Back
// @namespace	https://greasyfork.org/users/7517
// @description	Returns Panel link to dropdown menu.
// @icon		http://i.imgur.com/b7Fw8oH.png
// @version		1.0
// @author		akarin
// @include		/^http:\/\/myanimelist\.net\/(?!(anime|manga)list)/
// @grant		none
// ==/UserScript==

(function($) {
	if ($('#malLogin').length === 0) {
		$('<li class=""><span class="edit"><a href="/editprofile.php?go=panelsettings">Edit</a></span><a href="/panel.php">Panel</a></li>').insertBefore('#nav > li:first-of-type > ul > li:eq(0)');
	}	
})(jQuery);