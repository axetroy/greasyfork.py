// ==UserScript==
// @name        Hide Paywall on DN.se
// @description Hide DN Plus content
// @version     0.1.11
// @include     http://www.dn.se/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant       none
// @namespace https://greasyfork.org/users/84246
// ==/UserScript==

$(".paywall-content").height("100%");

setTimeout(function() {
	$(".paywall-content").height("100%");
	}, 1500);

setTimeout(function() {
	$(".paywall-content").height("100%");
	}, 3000);

setTimeout(function() {
	$(".paywall-content").height("100%");
}, 4500);