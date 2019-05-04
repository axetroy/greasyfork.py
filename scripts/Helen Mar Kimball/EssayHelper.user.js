// ==UserScript==
// @name         EssayHelper
// @namespace    http://www.reddit.com/r/exmormon
// @version      0.2
// @description  Makes essays easier to find!
// @author       Helen Mar Kimball
// @match        https://www.lds.org/?lang=eng
// @run-at       document-start
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant        none
// ==/UserScript==

$(document).ready(function() {
	if ($('#platform-canvas-content>section.hero>div.hero__column--right>div:first>a:first>div.teaser__content>p.teaser__title').length) {
		var root = $('#platform-canvas-content>section.hero>div.hero__column--right>div:first');

		root.removeAttr('data-omniture');

		var link = root.find('a:first');

		link.attr('href', 'http://www.lds.org/topics/plural-marriage-in-kirtland-and-nauvoo?lang=eng');
    
		var content = link.find('div.teaser__content');
    
		content.find('p.teaser__label').html('Remembering His Wives');
		content.find('p.teaser__title').html('Joseph Smith\'s Youngest Bride - Helen Mar Kimball');
	}
});