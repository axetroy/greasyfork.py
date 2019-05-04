// ==UserScript==
// @name        Hacker News Unicode upvotes
// @namespace   news.ycombinator.com
// @description Replace upvote arrows on Hacker News with Unicode characters
// @include     http://news.ycombinator.com/*
// @include     https://news.ycombinator.com/*
// @version     1
// @grant       none
// ==/UserScript==

var arrows = document.getElementsByClassName('votearrow');
var i = arrows.length;
while (i--) {
	var arrow = arrows[i];
	arrow.className = 'title';
	arrow.innerHTML = '▲';
}
