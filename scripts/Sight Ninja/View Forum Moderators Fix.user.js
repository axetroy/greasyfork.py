// ==UserScript==
// @name         View Forum Moderators Fix
// @namespace    http://sight.ninja
// @version      1.0
// @description  A simple fix so you can see the forum moderators
// @author       Sight Ninja
// @match        http://*.gaiaonline.com/forum/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	if(document.getElementsByClassName('subforums').length > 0){
		document.getElementsByClassName('subforums')[0].style.marginTop = '30px';
	}
})();