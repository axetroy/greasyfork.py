// ==UserScript==
// @name Hide Marktplaats ads
// @namespace http://www.jaron.nl/misc/
// @description Marktplaats hide ads
// @include http*://www.marktplaats.nl/*
// @version 0.6
// ==/UserScript==  

(function() {

	var $,
		sgDelay = 50;

	/**
	* hide all ads
	* @returns {undefined}
	*/
	var hideAds = function() {
		$('[id*="google"], [id*="adsense"],.listing-cas, [id^="banner"]').remove();
	};


	/**
	* 
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var init = function() {
		hideAds();
	};


	/**
	* 
	* @returns {undefined}
	*/
	var checkInit = function() {
		if (typeof jQuery === 'function') {
			$ = jQuery;
			init();
		} else {
			setTimeout(checkInit, sgDelay);
			sgDelay = sgDelay*1.2;
		}
	};
	

	checkInit();

})();