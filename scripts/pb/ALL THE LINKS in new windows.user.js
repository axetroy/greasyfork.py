// ==UserScript==
// @name        ALL THE LINKS in new windows
// @namespace   http://www.onfocus.com/
// @include     http://*.metafilter.com/*
// @version     1
// @description This will force all the links at MetaFilter.com sites to open in a new tab, even internal links.
// ==/UserScript==

(function(){
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = "$(function(){$('a').attr('target', '_blank');});";
	document.body.appendChild(script);
})();