// ==UserScript==
// @name        MTurk mosaic - Extract simple information (4 items)
// @namespace   http://idlewords.net
// @description Enlarge parts of the mosaic HIT UI
// @include     https://evolvdevelopment.com/hits/nexthit*
// @version     0.1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant       none
// ==/UserScript==


$(function() {
	$("#bigbox").attr('style', 'width: 95% !important;');
	$(".main").attr('style', 'height: 90% !important;');
	$(".chunkL").attr('style', 'width: 80% !important;');
	$(".chunkR").attr('style', 'width: 20% !important;');
});