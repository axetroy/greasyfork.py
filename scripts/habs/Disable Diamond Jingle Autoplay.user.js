// ==UserScript==
// @name    		Disable Diamond Jingle Autoplay
// @namespace		http://habs.sdf.org/
// @description     Sets the beloved Diamond League theme autoplay on diamondleague.com to off by default
// @include 		https://*.diamondleague.com/*
// @include 		https://diamondleague.com/*
// @version  		1
// @grant    		none
// ==/UserScript==

var v = document.getElementsByClassName('btn_soundcontrol fa fa-volume-up');
v.classList.remove('fa-volume-up');
v.classList.add('fa-volume-off');