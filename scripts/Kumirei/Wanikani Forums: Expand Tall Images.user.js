// ==UserScript==
// @name         Wanikani Forums: Expand Tall Images
// @namespace    http://tampermonkey.net/
// @version      0.1.3.
// @description  Expands tall images on the Wanikani forums
// @author       Kumirei
// @include      https://community.wanikani.com*
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js
// @grant        none
// ==/UserScript==

(function() {
		//wait for images
		waitForKeyElements('.lightbox img', function(e) {
				//get the infos
				var elem = e[0];
				var dim = [elem.width, elem.height];
				if (elem.height == 500) {//all images which need to be expanded are 500px height
						if ($(elem.nextSibling).find('.informations').length) {
								var infoElem = $(elem.nextSibling).find('.informations')[0];
								var ogDim = infoElem.innerHTML.split(' ')[0];
								if (ogDim.includes("x")) ogDim = ogDim.split('x');
								else if (ogDim.includes("×")) ogDim = ogDim.split('×');
								var scaledDim = [dim[0], Math.round(dim[0]/ogDim[0]*ogDim[1])]; //scales the height to the current width
								if (scaledDim[1] != 499 && dim[1] != scaledDim[1]) {//499 happened often, persumably because Discourse rounds up
										var url = elem.closest('.lightbox').href;
										elem.src = url;
										elem.height = scaledDim[1];
										elem.style = 'max-height: unset;';
										infoElem.innerHTML += ' <small>Expanded as tall image</small>';
								}
						}
				}
		});
})();