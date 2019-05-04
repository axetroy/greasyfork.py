// ==UserScript==
// @name        GeenStijl-Islamgejankfilter
// @namespace   gsislamgejankfilter
// @description GeenStijl, maar dan zonder dat eeuwige gejank over de islam
// @include     http://www.geenstijl.nl/
// @include		http://www.geenstijl.nl/index2.html
// @version     2
// @grant       none
// ==/UserScript==

var authors = [
	'Prof. Pinto',
	'Hans Jansen'
];
var keywords = [
	'sharia',
	'islam',
	'moslim',
	'terrorist',
	'fundi',
	'jihad',
	'wilders',
	'allah'
]

$('article').each(function(i, article) {
	var $footer = $(article).children('footer');
	var author = $footer.html().match(/([^\|]+) \|/)[1];	
	
	var fullArticle = $(article).html().toLowerCase();
	
	if(authors.indexOf(author) !== -1) {
		$(article).hide();
	} else if(new RegExp(keywords.join("|")).test(fullArticle)) {
		$(article).hide();
	}
});