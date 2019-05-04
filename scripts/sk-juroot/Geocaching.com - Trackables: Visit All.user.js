// ==UserScript==
// @name          Geocaching.com - Trackables: Visit All
// @namespace     JuRoot
// @description	  Script sets all trackables in users invetory to Visited state when logging finds
// @include       http*://www.geocaching.com/play/geocache/*/log*
// @include       http*://geocaching.com/play/geocache/*/log*
// @include       http*://*.geocaching.com/play/geocache/*/log*
// @grant         none
// @version       1.0.12
// ==/UserScript==

(function() {
	window.addEventListener('load', function() {
      window.setTimeout(function(){ 
        var button_visitAll = document.getElementsByClassName('btn-visit');
        if (button_visitAll.length > 0) {
          button_visitAll[0].click();
        }
      }, 3000);
	});
})();