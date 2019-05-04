// ==UserScript==
// @name TPC Sticky User Toolbar
// @namespace com.tipidpc.velc2009
// @description Transforms "User Options" on the left sidebar into a toolbar that sticks to the top
// @version 1.0.2
// @match https://tipidpc.com/*
// @license GPL-3.0
// @grant GM_addStyle
// ==/UserScript==

var userOptions = document.getElementById('user-options');
if (!userOptions) return;
userOptions.parentElement.removeChild(userOptions);

var userOptionsList = userOptions.getElementsByTagName('ul')[0];

userOptionsList.id = "user-options-list";
GM_addStyle('#user-options-list {background-color:#E80; padding:0.5em; top:0; box-sizing:border-box;}');
GM_addStyle('#user-options-list {border-bottom:1px solid #333;}');
GM_addStyle('#user-options-list li {background-image:none; display:inline; margin-bottom:0;}');
GM_addStyle('#user-options-list li:last-of-type {float:right; margin-right:10px;}');
GM_addStyle('#user-options-list li a {color: #fff;}');

var container = document.getElementById('container');
var header = document.getElementById('header');

var anchor = document.createElement('div');
header.appendChild(anchor);
header.appendChild(userOptionsList);

var icon = (function() {
	var icon = document.createElement('img');
	icon.src = 'favicon.ico';
	icon.style.verticalAlign = 'middle';
	
	var link = document.createElement('a');
	link.href = '/index.php';
	link.style.marginLeft = '10px';
	
	link.appendChild(icon);
	return link;
})();

function updateUserOptionsListPosition() {
	if (document.body.scrollTop > anchor.offsetTop) {
		if (userOptionsList.style.position != 'fixed') {
			userOptionsList.style.position = 'fixed';
			anchor.style.height = userOptionsList.offsetHeight + 'px';
			// userOptionsList.insertBefore(icon, userOptionsList.children[0]);
		}
	} else {
		if (userOptionsList.style.position != 'static') {
			userOptionsList.style.position = 'static';
			anchor.style.height = '0';
			// userOptionsList.removeChild(icon);
		}
	}
}

function updateUserOptionsListWidth() {
	userOptionsList.style.width = container.offsetWidth + 'px';
}

if (window.addEventListener) {
	window.addEventListener('scroll', updateUserOptionsListPosition);
	window.addEventListener('resize', updateUserOptionsListWidth);
} else {
	window.attachEvent('scroll', updateUserOptionsListPosition);
	window.attachEvent('resize', updateUserOptionsListWidth);
}

updateUserOptionsListPosition();
updateUserOptionsListWidth();