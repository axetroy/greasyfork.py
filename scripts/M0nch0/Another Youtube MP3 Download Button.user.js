// ==UserScript==
// @name          Another Youtube MP3 Download Button
// @namespace     https://github.com/M0nch0
// @author        Moncho
// @version       1.1
// @description   Adds a MP3 Download button next to the subscribe button, thanks to Youtube To Mp3 Script for their simple conversion and download service (https://www.youtubemp3script.com/). Based off Soulweaver's (https://greasyfork.org/en/users/5225-soulweaver) Youtube MP3 Download Button (https://greasyfork.org/en/scripts/4992-youtube-mp3-download-button).
// @icon          view-source:https://www.youtube.com/yts/img/favicon_32-vflOogEID.png
// @homepage      https://github.com/M0nch0/Another-Youtube-MP3-Download-Button
// @supportURL    https://github.com/M0nch0/Another-Youtube-MP3-Download-Button/issues
// @include       http://*.youtube.com/*
// @include       http://youtube.com/*
// @include       https://*.youtube.com/*
// @include       https://youtube.com/*
// @require       http://code.jquery.com/jquery-latest.js
// @grant         none
// ==/UserScript==


var linkPath ='https://www.recordmp3.co/#/watch?v='+encodeURIComponent(document.URL);
$('<a target="_blank" id="youtube2mp3" class="yt-uix-button yt-uix-button-default" href="'+linkPath+'" style="margin-left: 8px; height: 26px; padding: 0 22px; /* background-color: #e62117; */"><img src="https://raw.githubusercontent.com/M0nch0/Another-Youtube-MP3-Download-Button/master/resources/download.png" style="vertical-align:middle;color: white;"> <span class="yt-uix-button-content" style="line-height: 25px; /* font-variant: small-caps; */ font-size: 12px; /* color: #fefefe; */">MP3 Download</span></a>').insertAfter( "#watch7-subscription-container" );
