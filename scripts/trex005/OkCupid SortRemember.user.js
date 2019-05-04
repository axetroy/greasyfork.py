// ==UserScript==
// @name         OkCupid SortRemember
// @namespace    http://tapy.com
// @version      0.1
// @description  Allows OkCupid to remember your selected "Order By" between browsing sessions
// @match        http://www.okcupid.com/*
// @grant        none
// ==/UserScript==

//OkCupid already uses jQuery without the shortcut ($)
var old_href = jQuery('#nav_matches a').attr('href');
jQuery('#nav_matches a').attr('href',old_href.replace('&matchOrderBy=SPECIAL_BLEND',''));