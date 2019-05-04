// ==UserScript==
// @name CoolRom Download Helper
// @namespace https://greasyfork.org/scripts/138
// @version 1.01
// @description Skip countdown, [Partly] hide Ads.
// @include *://coolrom.com/*
// @include *://www.coolrom.com/*
// @grant       none
// @copyright 2012+, Jixun
// @run-at document-start
// ==/UserScript==

var win, funcLoad;
try { win = unsafeWindow }
catch (e) {	win = window }

addEventListener ('DOMContentLoaded', function () {
	if (!location.pathname.indexOf('/roms/')) {
		var dlAddrId = location.pathname.match (/\/(\d+)/)[1],
			ele = document.querySelector ('a[href*="dlpop"]').parentNode.parentNode,
			myRow = document.createElement ('tr');
		myRow.innerHTML = '<td colspan=3><iframe height=140 style="border: none;" src="/dlpop.php?id=' + dlAddrId + '"></iframe></td>';
		ele.parentNode.insertBefore (myRow, ele);
	} else if (!location.pathname.indexOf ('/dlpop.php')) {
		// Hide AD [If no ABP enabled]
		var hideAd = document.createElement('style');
		hideAd.innerHTML = 'iframe,object,img{display:none !important}';
		document.body.appendChild (hideAd);
		document.querySelector('table').removeAttribute ('height');
		// Clear countdown
		win.time = 0;
		win.download ();
	}
}, false);