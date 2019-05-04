// ==UserScript==
// @name           Gaia Watchlist Check All Expired
// @description    Fixes the check all box in the watch list and auto checks expired items.
// @include        http://www.gaiaonline.com/marketplace/watchlist
// @include        http://gaiaonline.com/marketplace/watchlist
// @include        http://www.gaiaonline.com/marketplace/watchlist/
// @include        http://gaiaonline.com/marketplace/watchlist/
// @version 0.0.1.20140525024112
// @namespace https://greasyfork.org/users/2178
// ==/UserScript==
var ex = document.getElementsByClassName('watchlist_rowEX');
for(var i=0;ex.length>i;i++){
	ex[i].getElementsByTagName('input')[0].checked=true;
}