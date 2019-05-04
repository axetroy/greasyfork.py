// ==UserScript==
// @name        Google docs - force preview
// @description Redirects edit to preview
// @namespace   http://eldar.cz/myf/
// @include     https://docs.google.com/*
// @include     https://drive.google.com/*
// @version     1.0.1
// @grant       none
// @run-at      document-start
// ==/UserScript==

var r = /\/edit$/;
if (r.test(document.location.pathname)) {
	document.location.pathname = document.location.pathname.replace(r, '/preview');
}