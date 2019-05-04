// ==UserScript==
// @name        PP mail remove autocomplete
// @namespace   armeagle.nl
// @include     https://mail.piratenpartij.nl/*
// @version     1
// @description remove autocomplete in Piratenpartij.nl mail
// ==/UserScript==

var password = document.getElementById('rcmloginpwd');
if (password) {
	password.removeAttribute('autocomplete');
}