// ==UserScript==
// @name			Linkify OKCupid Profile Location to Google Maps
// @description		Makes location into a Google Maps link
// @include			http*://www.okcupid.com/profile/*
// @namespace		pilnick.com
// @version			1.2
// ==/UserScript==

var locE = document.getElementById('ajax_location');
var location = locE.textContent;

var newSrc = "https://www.google.com/maps/place/"+location;
var link = document.createElement('a');
link.setAttribute("href",newSrc);
link.setAttribute("target","_blank");
link.innerHTML = location;
locE.parentNode.replaceChild(link,locE);