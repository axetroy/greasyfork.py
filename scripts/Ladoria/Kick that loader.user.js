// ==UserScript==
// @name 		Kick that loader
// @namespace 		InGame
// @include 		http://www.dreadcast.net/Main
// @author 		Ladoria
// @version 		1
// @description 	A script who kick that loader
// @compat 		Firefox, Chrome
// @require      	http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

jQuery.noConflict();

jQuery(document).ready(function() {
	jQuery('#zone_chargement').hide();
});