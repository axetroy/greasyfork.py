// ==UserScript==
// @name Youtube NoHTML5
// @description     Little primitive youtube html5 disabler
// @author          Alpha900i
// @icon            http://youtube.com/favicon.ico
// @namespace		//
// @include			http*://*.youtube.com/watch*
// @include			http*://youtube.com/watch*
// @version 0.0.1.20161207134339
// ==/UserScript==
if (document.location.href.indexOf("nohtml5=1")==-1)
	window.location.href = document.location.href+"&nohtml5=1"

