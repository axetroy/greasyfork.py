// ==UserScript==
// @name        hide ann ep reviews
// @namespace   thewildsun
// @include     http://www.animenewsnetwork.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version     1.2
// @grant       none
// @description hides ann ep reviews
// ==/UserScript==

(function() {
	$('div.herald.box.reviews span.intro').css({opacity:0});
})();