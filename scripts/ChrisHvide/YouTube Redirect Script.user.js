// ==UserScript==
// @name       YouTube Redirect Script
// @namespace  https://github.com/mshamory
// @version    1.0
// @description  Redirect homepage & logo to My Subscriptions, & channel to videos.
// @match      http://www.youtube.com/*
// @match      https://www.youtube.com/*
// @copyright  2018
// @author     Chris Hvide
// ==/UserScript==

document.getElementById("logo-container").href = "/feed/subscriptions";

var regex = new RegExp("/");

// Check if cookie SID can be found (seems to be used when signed in)
if (document.cookie.indexOf("SID") !== -1 && !document.referrer.match(regex)) {
	document.location = document.URL + "/feed/subscriptions";
}

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