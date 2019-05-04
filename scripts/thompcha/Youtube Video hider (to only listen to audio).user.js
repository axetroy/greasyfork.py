// ==UserScript==
// @name         Youtube Video hider (to only listen to audio)
// @version      1.2
// @description  A userscript that hides most of the video content on youtube, so you can listen rather than watch!
// @match        *://*.youtube.com/*
// @run-at       document-end
// @grant        none
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @namespace https://greasyfork.org/users/44041
// ==/UserScript==

function hideVideo() {
  //console.log('hiding video..........');
  document.querySelector("div > video").style.opacity = '0';
    if ($('#hide-vid').length == 0 ){
        $('.view-count').append(' <label><input type="checkbox" id="hide-vid"/> Show video</label>');

        $('#hide-vid').click(function() {
            console.log($("div > video").css("opacity"));
            if ($("div > video").css("opacity") == 0){
            document.querySelector("div > video").style.opacity = '1';
            clearTimeout(myTimer);
            } else {
        document.querySelector("div > video").style.opacity = '0';
    }
        });
    }

}
//setTimeout(hideVideo, 100);
// or
var myTimer = setInterval(hideVideo, 1000);

$( document ).ready(function() {
});