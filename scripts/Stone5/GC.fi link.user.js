// ==UserScript==
// @name        GC.fi link
// @namespace   http://stone.kapsi.fi/
// @description Geocaching.comin kätkökuvaussivulle linkki geocache.fi:n vastaavalle
// @include     http*://www.geocaching.com/seek/cache_details.aspx?*
// @include     http*://www.geocaching.com/geocache/*
// @version     2
// @grant       none
// ==/UserScript==

var gckoodi = document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode').innerHTML;
document.getElementById('ctl00_ContentBody_CacheName').innerHTML += '&nbsp;&nbsp;<a href="http://www.geocache.fi/caches/cachetieto.php?wp='+gckoodi+'">[GC.fi]</a>';