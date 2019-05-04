// ==UserScript==
// @name         Hide Facebook Side Ads
// @description  Removes Side Ads from Facebook
// @author       Nyk Zukowski
// @include      http*//*facebook.com/*
// @grant        GM_addStyle
// @version      1.0.1
// @namespace    https://greasyfork.org/users/54551
// ==/UserScript==

/*jshint multistr: true */

/* Found these elements by Inspecting in Chrome, applied custom CSS and duplicated here; working cleanly as of 24 May 2017 */
GM_addStyle ( "                                     \
    #pagelet_ego_pane {                                         \
	  display: none;                              \
	}                                               \
" );