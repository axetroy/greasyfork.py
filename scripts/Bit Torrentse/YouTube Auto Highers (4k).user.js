// ==UserScript==
// @name          YouTube Auto Highers (4k)
// @description   Make Play Video Auto Highers
// @details       Make Play Video Auto Highers
// @author        Bit Torrentse
// @license       MIT
// @namespace     https://github.com/BitTorrentse1/JavaScript-Premium-Accounts
// @homepage      https://github.com/BitTorrentse1/JavaScript-Premium-Accounts
// @include       http://*.youtube.com/*
// @include       http://youtube.com/*
// @include       https://*.youtube.com/*
// @include       https://youtube.com/*
// @version       1.4
// @icon          http://upload.wikimedia.org/wikipedia/commons/e/e8/Logo_Youtube.svg
// @run-at        document-start
// @copyright     2014+, Bit Torrentse (http://www.absba.org)
// ==/UserScript==
var customQuality = true;
var quality = "highres";
if (customQuality)
{
    var qualitySwap = {"240":"small", "360":"medium", "480":"large", "720":"hd720", "1080":"hd1080", "1440":"hd1440", "highres":"highres"};
    unsafeWindow.onYouTubePlayerReady = function (playerId) {
        location.href = 'javascript:void((function () { document.getElementById("movie_player").setPlaybackQuality("' + qualitySwap[quality] + '"); })())';
    };
}