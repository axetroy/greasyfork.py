// ==UserScript==
// @name        spiegel.de: entferne bento.de Promotions
// @description Entfernt Elemente von Spiegel Online, die auf bento.de verweisen
// @namespace   https://greasyfork.org/en/users/13300-littlepluto
// @match       *://www.spiegel.de/
// @match       *://www.spiegel.de/#*
// @match       *://www.spiegel.de/*/
// @match       *://www.spiegel.de/*/#*
// @match       *://www.spiegel.de/*/archiv*.html
// @exclude-match     *://www.spiegel.de/international/*
// @exclude-match     *://www.spiegel.de/fotostrecke*
// @exclude-match     *://www.spiegel.de/forum/*
// @exclude-match     *://www.spiegel.de/video/
// @exclude-match     *://www.spiegel.de/nachrichtenarchiv/*
// @exclude-match     *://www.spiegel.de/schlagzeilen/*
// @noframes
// @version     1.8
// @grant       none
// ==/UserScript==
var candidateSelectors = [
	'ul.article-list > li',
	'div.teaser', 
	'div.asset-box.asset-list-box.clearfix',
	'div.ressort-teaser-box-top',
	'div.clearfix.module-box.bento'
];

var bentoClassLinks = document.querySelectorAll('a.bento');

for(var link of bentoClassLinks) {
  var containerElement = link.closest(candidateSelectors);
  if(containerElement && containerElement.parentElement){
    containerElement.parentElement.removeChild(containerElement);
  }
}