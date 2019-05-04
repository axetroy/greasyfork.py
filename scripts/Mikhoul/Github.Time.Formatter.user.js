// ==UserScript==
// @name           Github.Time.Formatter
// @namespace      Github.Time.Formatter
// @description    Github.Time.Formatter . I'm sick of "xx month ago", 'cuz I'm a programmer, not a goddamn calendar.
// @version        0.12
// @include       http*://github.com/*
// ==/UserScript==

(function(){
	'use strict';
	function format(timeElem){
		var time=timeElem.title||timeElem.datetime;
		if(time){
			timeElem.innerHTML=time;
		}
	}
	function onDOMSubtreeModifiedHandler(e){
		var target = e.target;
		// console.log(target);
		if(target.nodeType === 1 && /TIME/ig.test(target.nodeName)&&/ago/.test(target.innerHTML)) {
			format(target);
		}
	}
	(function(){
		var matches = document.querySelectorAll('time');
		for(var i = 0; i < matches.length; ++i) {
			format(matches[i]);
		}
	})();
	document.addEventListener('DOMSubtreeModified', onDOMSubtreeModifiedHandler, false);
})();