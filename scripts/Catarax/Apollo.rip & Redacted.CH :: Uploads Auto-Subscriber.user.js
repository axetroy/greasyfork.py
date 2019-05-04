// ==UserScript==
// @name        Apollo.rip & Redacted.CH :: Uploads Auto-Subscriber
// @description Your uploads will be directly subscribed
// @include		http*://*redacted.ch/torrents.php*
// @include		http*://*apollo.rip/torrents.php*
// @version		1.1
// @icon        https://redacted.ch/favicon.ico
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_xmlhttpRequest
// @namespace https://greasyfork.org/users/2290
// ==/UserScript==

// Getting the usernum
var usernum = document.documentElement.innerHTML.match(/user\.php\?id\=[0-9]+/)[0].split("?")[1];
// Converting the userid to only numbers from API
var userid = usernum.replace(/[^0-9]/g, '');

// Getting the torrent ID
var pageid = document.URL.split("=")[1];
var pageixd = pageid.split("&")[0];

var page = 'torrents';

// We get torrent details
var str2 = $("#torrent_details").html();
// Extraction of all userid's possible
var number = str2.replace(/[^0-9]/g, '');

// Getting the current subscribing status
var status_subscribe = $("#subscribelink_" + page + pageixd).text();

// If the userid is found in the upload list and if we can subscribe to the release, let's do it!
if(number.indexOf(userid) > -1 && status_subscribe == "Subscribe"){

    SubscribeComments(page, pageixd);
}