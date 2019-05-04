// ==UserScript==
// @id             YTPPAA141226
// @name           Youtube Prevent Playlist Auto Advance (HTML5)
// @version        1.0
// @namespace      OK
// @author         wordsnerd, Exaskryz
// @description    Pause HTML5 videos with one second remaining in playlists
// @include        *.youtube.*list*
// @run-at         document-idle
// ==/UserScript==
var paused = false;
var vids = document.getElementsByClassName("video-stream");

if (vids.length) {
    vids[0].addEventListener("timeupdate", function() { findDif(vids[0]) }, false);
}

function findDif(vid) {
    var pos = vid.currentTime;
    var len = vid.duration;
    if (!paused && len - pos < 1) {
        vid.pause();
        paused = true;
    }
    if (paused && len - pos > 1) {
        paused = false;
    }
}