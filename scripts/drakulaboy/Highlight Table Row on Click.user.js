// ==UserScript==
// @name          Highlight Table Row on Click
// @description   Highlight Table Row on Mouse Click
// @include       http*://*
// @version       1.0
// @namespace     script
// ==/UserScript==

var trs = document.getElementsByTagName('tr');
var cached_bg = new Array();

var trs = document.getElementsByTagName('tr');
	for (var i = trs.length - 1; i >= 0; i--) {
		var elmRow = trs[i];
		cached_bg[i] = elmRow.style.backgroundColor;
		elmRow.addEventListener('click', function() {
			remove_highlight();
			this.style.backgroundColor = '#fcc';
		}, true);
	}

function remove_highlight(){
	var trs = document.getElementsByTagName('tr');
	for(var i = trs.length - 1; i >- 0; i--){
		trs[i].style.backgroundColor = cached_bg[i];
	}
}
