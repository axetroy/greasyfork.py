// ==UserScript==
// @name Antisocial Quora
// @description No more idiotic social media popups on Quora
// @date 2015-02-22
// @include http://*.quora.com/*
// @license MIT
// @grant none
// @version 0.0.1.20150223022009
// @namespace https://greasyfork.org/users/6016
// ==/UserScript==


// Add global CSS styles
// from http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('.fb-facepile { display: none !important; }');
addGlobalStyle('.modal_signup_background { display: none !important; }');
addGlobalStyle('.modal_signup_dialog { display: none !important; }');
