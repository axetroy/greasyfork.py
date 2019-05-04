// ==UserScript==
// @name CSDN Blog Blocker Blocker
// @description Get rid of the 'continue reading' button
// @match https://blog.csdn.net/*
// @copyright Nianyi Wang
// @version 0.0.1.20180901150149
// @namespace https://greasyfork.org/users/209602
// ==/UserScript==

(function() {
	'use strict';
	
	var execute = function() {
		document.getElementById('article_content').removeAttribute('style');
		document.getElementsByClassName('hide-article-box')[0].outerHTML = '';
	};
	
	var interval = 100, timeout = 8000, start = new Date();
	var mark = setInterval(function() {
		if(new Date() - start > timeout)
			clearInterval(mark);
		var button = document.getElementById('btn-readmore');
		if(button) {
			execute();
			clearInterval(mark);
		}
	}, interval);
})();
