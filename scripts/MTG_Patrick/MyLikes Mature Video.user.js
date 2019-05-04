// ==UserScript==
// @name         MyLikes Mature Video
// @version      0.1
// @description  Make submition instant
// @author       MTG_Patrick
// @require     http://code.jquery.com/jquery-latest.min.js
// @include     https://s3.amazonaws.com/*
// @grant        none
// @namespace https://greasyfork.org/users/10525
// ==/UserScript==

if(document.getElementById('submit_mature'))
{
    // Logic for handling video
    var video = urlParam('video');
    if (video != "") {
        $('#image_link').hide();
        Video.play($("#video"), urlParam('site'), urlParam("vidId"), true);
        if (valid) {
            setTimeout(makeClickable, 19000);
            makeClickable();
        }
    } 
}