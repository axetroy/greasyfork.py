// ==UserScript==
// @name        Embedded YouTube Title Mouseover
// @description Expand truncated titles in embedded YouTube videos on mouseover
// @include     https://www.youtube.com/embed/*
// @namespace   hanson.ira@gmail.com
// @version     1.10
// @grant       None
// ==/UserScript==

setTimeout(function () {
	"use strict";

	function linkText(link) {
		return link.firstChild.nodeValue;
	}

	var links = document.getElementsByClassName("ytp-title-link");
	for (var i = 0; i < links.length; i++) {
		links[i].setAttribute("title", linkText(links[i]));
	}
}, 0);