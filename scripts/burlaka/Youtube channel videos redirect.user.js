// ==UserScript==
// @name         Youtube channel videos redirect
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Change links to channel video instead of channel main page
// @author       Burlaka.net
// @match        *://youtube.com/*
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	document.addEventListener('mouseover', getLink);

	function getLink(linkElement) {
	    var url = linkElement.target.toString();

	    if ((url.search("www.youtube.com") != -1) && (url.match(/\//g).length < 5)) {
	        if ((url.match(/https:\/\/www.youtube.com\/channel\//i) && (/videos/.test(url) == false))) {
	            changeLink(linkElement);
	        } else if ((url.match(/https:\/\/www.youtube.com\/user\//i) && (/videos/.test(url) == false))) {
	            changeLink(linkElement);
	        }
	    }

	}

	function changeLink(linkElement) {
	    var newUrl = linkElement.target.toString().concat("/videos?disable_polymer=1");
	    linkElement.target.href = newUrl;
	}
})();