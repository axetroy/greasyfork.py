// ==UserScript==
// @name        Twitter timestamp convert
// @namespace   mscststs
// @version      0.1
// @description  convert the time to exact time
// @author       mscststs
// @match        https://twitter.com/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	function reset(){
		$(".tweet-timestamp").each(function(){
			let f = $(this).find(".js-short-timestamp");
			f.text($(this).attr("title")||$(this).attr("data-original-title")||"");
		});
	}
	reset();
	setInterval(()=>{
		reset();
	},4e3);
})();