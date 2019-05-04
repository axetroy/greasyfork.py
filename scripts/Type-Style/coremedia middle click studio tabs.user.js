// ==UserScript==
// @name        coremedia middle click studio tabs
// @namespace   cm-studio
// @description adds mouswheelclick close behavior to CM-Studio tabs
// @include     /^.*?\bstudio\b.*?\bstudio\b.*?$/
// @version     1
// @grant       none
// ==/UserScript==
if (jQuery) {
	jQuery(window).load(function() {
		if (jQuery(".remote-body").length) {
			console.info("[Greasmonkey]: Studio detected");
			window.setInterval(function() {
				//console.log(jQuery('.x-tab-right:not[href]').length);	
				jQuery('.x-tab-right[href]').removeAttr("href").mouseup(function(e) {
					if (e.which == 2) {
						jQuery(this).prev()[0].click();
					}
				});
			}, 2000);
		}
		
	});		
}
