// ==UserScript==
// @name NO FUCKING FACEBOOK HUENDS
// @namespace http://tampermonkey.net/
// @version 0.3
// @description try to take over the world!
// @author You
// @match https://www.facebook.com/*
// @grant none
// ==/UserScript==

(function() {
// match https://www.facebook.com/friends/requests/*
	'use strict';
	setInterval(function(){
		var elements = document.body.getElementsByClassName("friendBrowserCheckboxContentGrid")[0].getElementsByTagName("a");
//		elements.style.border="2px solid red";
		if(elements.length>1){
			for (var i=0; i < (elements.length); i++){
				if(elements[i].classList.contains("removeButton")){
					elements[i].style.border="2px solid green";
					elements[i].click();
				}
			}
		}
//		elements = document.body.getElementsByClassName("pam uiBoxWhite topborder uiMorePagerPrimary");
//		elements[0].style.border="2px solid red";
//		elements[0].click();
	},150);
})();