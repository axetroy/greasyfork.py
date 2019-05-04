// ==UserScript==
// @name         Youtube Thumbnail
// @namespace    Youtube.com
// @version      1.3.2
// @description  Adds clickable preview thumbnail next to the vids title. When clicked opens new window with original size thumbnail. Script works with old youtube layout only.
// @author       Puzzle
// @include      *://*.youtube.com/*
// @match        *://*.youtube.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	
	if (location.pathname == '/watch')
		createImage();
	
	document.addEventListener('spfdone',function(e) {
		if (location.pathname == '/watch')
			createImage();
	});
	
	function createImage() {
		var parent =  document.querySelector('#watch-headline-title');

		if (!parent) return;

		var	img = document.createElement('img');
		img.src = document.querySelector("link[itemprop='thumbnailUrl']").href;	
		img.style = 'margin-right:10px;height:50px;cursor:pointer;float:left';
		img.onclick = function() { window.open(img.src); };

		parent.insertAdjacentElement('afterBegin',img);		
	}
})();