// ==UserScript==
// @name         Seletion is Back! @idol
// @version      2.8
// @description  Get select & copy & right-click back on nogizaka's & keyakizaka's official website
// @author       nondanee
// @match        *://*.keyakizaka46.com/*
// @match        *://*.nogizaka46.com/*
// @namespace https://greasyfork.org/users/160192
// ==/UserScript==

(function() {
	'use strict'
	var styleSheet = [].slice.call(document.styleSheets).filter(function(styleSheet){return !styleSheet.href})[0]
	if(/nogizaka/.test(window.location.href)){
		document.body.oncontextmenu = null
		styleSheet.insertRule('::selection{background: rgba(126, 16, 131, 0.9); color: #ffffff}', 0)
	}
	else if(/keyakizaka/.test(window.location.href)){
		var reset = {'touch-callout': 'auto', 'user-select': 'auto', '-webkit-touch-callout': 'auto', '-ms-user-select': 'auto', '-webkit-user-select': 'auto', '-moz-touch-callout': 'auto', '-moz-user-select': 'auto'}
		$('body').off('contextmenu')
		$('.box-main').off('contextmenu')
		$('.box-news_detail').off('contextmenu')
		$('.box-newposts').off('contextmenu')
		$('.keyaki-hiragana-mess').css(reset)
		$('.keyaki-member_detail').css(reset)
		$('.box-main').css(reset)
		$('.box-news_detail').css(reset)
		$('.box-newposts').css(reset)
		$('.box-report').css(reset)
		$('.slick-slider').css(reset)
		styleSheet.insertRule('::selection{background: rgba(160, 212, 104, 0.9); color: #ffffff}', 0)
	}
})()