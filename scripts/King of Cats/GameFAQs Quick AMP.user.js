// ==UserScript==
// @name           GameFAQs Quick AMP
// @description    Tosses a link to your AMP in the header.
// @author         King of Cats
// @namespace      Cats
// @version        1
// @grant          none
// @include        http://www.gamefaqs.com/*
// ==/UserScript==

var userMast = document.getElementsByClassName("masthead_user");
if (userMast[0] != null) {
	var ampLink = document.createElement('a');
	ampLink.setAttribute("href","/boards/myposts.php");
	ampLink.textContent = "AMP";
	userMast[0].insertBefore(ampLink,userMast[0].childNodes[2]);
}