// ==UserScript==
// @name          Geocaching.com - Maps: My Finds and My Hides off by default
// @namespace     JonathanEH
// @description	  The script sets My Finds and My Hides off by default on the Geocaching.com Map.
// @include       http://geocaching.com/map/*
// @include       http://www.geocaching.com/map/*
// @include       https://geocaching.com/map/*
// @include       https://www.geocaching.com/map/*
// @grant         none
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version       2014.5.16
// ==/UserScript==

(function() {
	
	window.addEventListener('load', function() {
		$('#m_myCaches .ct_mf').click();
		$('#m_myCaches .ct_mo').click();
	}, false);

})();
