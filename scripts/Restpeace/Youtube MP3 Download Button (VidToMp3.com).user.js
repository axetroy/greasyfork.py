// ==UserScript==
// @name       Youtube MP3 Download Button (VidToMp3.com)
// @version    1.001
// @description Adds a button [MP3 Download], to download music from YouTube through service vidtomp3.com
// @match       http*://www.youtube.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright   2015.02.08, Restpeace
// @namespace https://greasyfork.org/users/8668
// ==/UserScript==
        var linkPath ='http://www.vidtomp3.com/process.php?url='+encodeURIComponent(document.URL);
        $(  '<a target="_blank" id="youtube2mp3" class="yt-uix-button yt-uix-button-default" href="'+linkPath+'" style="margin-left: 8px; height: 26px; padding: 0 22px; /* background-color: #e62117; */"><img src="http://youtubeinmp3.com/icon/download.png" style="vertical-align:middle;color: white;"> <span class="yt-uix-button-content" style="line-height: 25px; /* font-variant: small-caps; */ font-size: 12px; /* color: #fefefe; */">MP3 Download</span></a>').insertAfter( "#watch7-subscription-container" );   