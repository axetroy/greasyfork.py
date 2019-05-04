// ==UserScript==
// @name            Comic Adapter: Freefall
// @version         2019.01.08
// @description     Add number of stripe
// @include         http*://freefall.purrsia.com/*
// @icon            https://www.google.com/s2/favicons?domain=freefall.purrsia.com
// @grant           none
// @author          Rainbow-Spike
// @namespace       https://greasyfork.org/users/7568
// @homepage        https://greasyfork.org/ru/users/7568-dr-yukon
// ==/UserScript==

var	number = document.querySelector("img").src.match(/f[cv]0(\d+)/)[1], // search number of stripe in path of image
	title = '';

// search location of title of comic
if (window.location.href.search("default.htm") != -1 ) { // if last page
	title = document.querySelector("table").nextSibling.nextSibling;
} else { // if non-last page
	title = document.querySelector("font");
}

title.innerHTML += ' ' + number; // insert number of stripe after title of comic
