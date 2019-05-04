// ==UserScript==
// @name        bib - highlight retail
// @namespace   diff
// @include     http*://bibliotik.me/*torrents*
// @include     http*://bibliotik.me/collections/*
// @include     http*://bibliotik.me/uploads*
// @include     http*://bibliotik.me/users/*
// @include     http*://bibliotik.me/tags/*/torrents/*
// @include     http*://bibliotik.me/creators/*/torrents/*
// @include     http*://bibliotik.me/publishers/*/torrents/*
// @grant	none
// @version     0.8
// @description colour highlight for retail
// ==/UserScript==

var spans = document.querySelectorAll('span.title');
for (i=0; cell=spans[i].parentNode; i++) {
	if (cell.textContent.indexOf("[Retail]") != -1) {
		cell.style.backgroundColor='#D4D4FF';
	}
}