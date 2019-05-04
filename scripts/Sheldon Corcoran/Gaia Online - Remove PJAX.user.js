// ==UserScript==
// @name        Gaia Online - Remove PJAX
// @namespace   Awesomolocity
// @description Gaia's PJAX sucks (and has a tendency to lag and freeze). Remove it
// @include     http://www.gaiaonline.com/*
// @version     1
// @grant       none
// ==/UserScript==

while(document.getElementsByClassName('yui3-pjax').length>0){
	document.getElementsByClassName('yui3-pjax')[0].classList.remove('yui3-pjax');
}