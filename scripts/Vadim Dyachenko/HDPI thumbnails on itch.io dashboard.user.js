// ==UserScript==
// @name         HDPI thumbnails on itch.io dashboard
// @namespace    http://yal.cc/
// @version      1.0
// @description  Forces dashboard' game thumbnails to use HDPI versions of the images.
// @author       YellowAfterlife
// @match        https://itch.io/dashboard
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	var covers = document.getElementsByClassName("cover_image");
	for (var i = 0; i < covers.length; i++) {
		var css = covers[i].style;
		var mt = /(url\("[^"]+"\)) 2x/g.exec(css.backgroundImage);
		if (mt) css.backgroundImage = mt[1];
	}
})();