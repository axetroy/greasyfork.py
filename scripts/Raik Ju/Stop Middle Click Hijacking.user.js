// ==UserScript==
// @name        Stop Middle Click Hijacking
// @description Prevent sites from hijacking the middle mouse button for their own purposes
// @version     0.1
// @license     GNU General Public License v3
// @copyright   2014, Nickel
// @grant       none
// @include     *://www.youtube.com/*
// @namespace https://greasyfork.org/users/10797
// ==/UserScript==

(function(){
	//Adapted from Chrome extension (written by petergrabs@yahoo.com)
	//TODO: would event.preventDefault() also work??

	document.addEventListener("click", function(e){ e.button===1 && e.stopPropagation(); }, true);
})();