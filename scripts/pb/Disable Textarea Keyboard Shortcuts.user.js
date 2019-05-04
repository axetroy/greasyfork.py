// ==UserScript==
// @name           Disable Textarea Keyboard Shortcuts
// @namespace      http://www.onfocus.com/
// @description    Disables the keyboard shortcuts in textareas.
// @include        http://*.metafilter.com*
// @version 0.0.1.20140616162824
// ==/UserScript==

(function(){
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = "$(function(){$('#comment').unbind();});";
	document.body.appendChild(script);
})();