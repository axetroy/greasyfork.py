// ==UserScript==
// @name        	PTT Push Count
// @description     Count pushes on PTT.cc.
// @namespace   	eight04.blogspot.com
// @include       	https://www.ptt.cc/bbs/*
// @version       	0.1.0
// @grant			none
// ==/UserScript==

(function(){

	var pushes = document.querySelectorAll(".push"),
		i;
		
	function createCount(i, base) {
		var span = document.createElement("span");
		span.className = "push-count " + base.children[0].className;
		span.textContent = i;
		return span;
	}
	
	for (i = 0; i < pushes.length; i++) {
		pushes[i].insertBefore(createCount(i + 1, pushes[i]), pushes[i].children[0]);
	}
})();
