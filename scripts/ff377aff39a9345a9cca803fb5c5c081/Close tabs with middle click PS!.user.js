// ==UserScript==
// @name        Close tabs with middle click PS!
// @namespace   closetabswithmiddleclickps
// @description Close tabs with middle click in Pokémon Showdown!
// @include     http://play.pokemonshowdown.com/
// @include     https://play.pokemonshowdown.com/
// @include     http://play.pokemonshowdown.com/*
// @include     https://play.pokemonshowdown.com/*
// @include     http://*.psim.us/
// @include     https://*.psim.us/
// @include     http://*.psim.us/*
// @include     https://*.psim.us/*
// @version     1
// @grant       none
// ==/UserScript==

window.addEventListener('load', function() {
	$('.tabbar.maintabbar > .inner').on('mousedown', '> ul > li > a', function(e) {
		if (e.which === 2) $(this).siblings('.closebutton').click();
	});
}, false);