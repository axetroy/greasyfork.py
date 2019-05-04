// ==UserScript==
// @name        A-P search defaults to manga on manga pages
// @description With this, when you visit a page in the manga section on anime planet, the search type will default to manga.
// @namespace   https://github.com/jahu00
// @include     http://www.anime-planet.com/manga/*
// @version     1
// @grant       none
// ==/UserScript==
{
	var typeSelector = document.querySelector('#siteSearch-select');
	if (typeSelector != null)
	{
		typeSelector.value = "manga";
	}
}