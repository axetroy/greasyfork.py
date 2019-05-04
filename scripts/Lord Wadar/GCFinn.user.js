// ==UserScript==
// @name           GCFinn
// @version        1.1.2
// @namespace      https://greasyfork.org/nb/scripts/40538-gcfinn
// @description    Finn Kart-link for Geocaching.com
// @include        http*://*geocaching.com/geocache/*
// @include        http*://*geocaching.com/seek/cache_details.aspx*
// ==/UserScript==

//  Copyright (c) 2009-2010 Jostein Austvik Jacobsen
//  Edited by Lord Wadar 2017-2018
//
//  Permission is hereby granted, free of charge, to any person
//  obtaining a copy of this software and associated documentation
//  files (the "Software"), to deal in the Software without
//  restriction, including without limitation the rights to use,
//  copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following
//  conditions:
//
//  The above copyright notice and this permission notice shall be
//  included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
//  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
//  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
//  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
//  OTHER DEALINGS IN THE SOFTWARE.

mapLinks = document.getElementById('ctl00_ContentBody_MapLinks_MapLinks');
mapLinksLi = mapLinks.getElementsByTagName('li');
query = mapLinksLi[0].getElementsByTagName('a')[0].href.split("?");
query = query[query.length-1];
lat = null;
lng = null;
for (var i = 0; i < query.split("&").length; i++) {
    pair = query.split("&")[i];
    if (pair.split("=").length <= 1) continue;
    key = pair.split("=")[0];
    if (key == "lat")
        lat = pair.split("=")[1];
    if (key == "lng" || key == "lon")
        lng = pair.split("=")[1];
}
if (lat != null && lng != null) {
    cacheName = document.getElementById('ctl00_ContentBody_CacheName').textContent;
    finnLink = document.createElement('li');
    finnLink.innerHTML = '<a href="http://kart.finn.no/?lng='+lng+'&lat='+lat+'&zoom=20&mapType=finnhybrid&markers='+lng+','+lat+',r,'+escape(cacheName)+'" target="_blank">FINN Kart</a>';
    mapLinks.appendChild(finnLink);
}
