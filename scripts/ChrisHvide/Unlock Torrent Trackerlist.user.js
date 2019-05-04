// ==UserScript==
// @name	Unlock Torrent Trackerlist
// @include	http://www.torrenttrackerlist.com/*
// @include	https://torrenttrackerlist.com/*
// @include	https://www.torrenttrackerlist.com/*
// @include	http://torrenttrackerlist.com/*
// @description	Fix Torrent Tracker List's download link.
// @version	1
// @namespace https://greasyfork.org/users/31723
// ==/UserScript==


var html = document.body.innerHTML;
html = html.replace( /class="onp-sl-content" style="display: none;"/g, 'class="onp-sl-content" style="display: true;"' );
document.body.innerHTML = html;