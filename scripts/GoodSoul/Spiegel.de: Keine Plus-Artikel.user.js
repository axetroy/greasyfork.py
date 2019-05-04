// ==UserScript==
// @name        Spiegel.de: Keine Plus-Artikel
// @description Entfernt SpiegelPlus Artikel
// @namespace   https://greasyfork.org/de/scripts/377611
// @match       http://www.spiegel.de/
// @match       http://www.spiegel.de/*/*/*-a-*.html
// @match       http://www.spiegel.de/#*
// @match       http://www.spiegel.de/*/
// @match       http://www.spiegel.de/*/#*
// @match       http://www.spiegel.de/*/archiv*.html
// @exclude     http://www.spiegel.de/international/*
// @exclude     http://www.spiegel.de/fotostrecke*
// @exclude     http://www.spiegel.de/forum/*
// @noframes
// @version     1.6
// @grant       none
// ==/UserScript==

var candidateSelectors = [
	'div.column-wide > div.asset-box.asset-link-box > ul > li',
	'ul.article-list > li',
	'div.teaser',
	'div.asset-box',
	'div.ressort-teaser-box-top',
	'div.clearfix.module-box.bento'
];


candidateSelectors = candidateSelectors.toString();
var links = document.querySelectorAll('a[href*=\'plus\/\']');
for(var link of links) {
  var containerElement = link.closest(candidateSelectors);
  if(containerElement && containerElement.parentElement){
    containerElement.parentElement.removeChild(containerElement);
  }
}