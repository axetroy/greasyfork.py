// ==UserScript==
// @name        KickThoseThings1
// @namespace   InGame
// @include     http://www.dreadcast.net/Forum/2-691-ami-du-flood-*
// @version     2
// @grant       none
// @author	Ladoria
// @description Kick thoses things
// ==/UserScript==

$(document).ready( function() {
	function KickThoseThings() {
		$('.sexe0').parent().parent().each( function() {
			$(this).hide();
			$(this).prev().hide();
		});
	}

	KickThoseThings();
	
	$(document).ajaxComplete( function() {
		KickThoseThings();
	});
});