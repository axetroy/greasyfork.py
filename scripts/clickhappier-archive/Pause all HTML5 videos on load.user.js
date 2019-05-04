// ==UserScript==
// @name         Pause all HTML5 videos on load
// @author       Scuzzball
// @namespace    http://userscripts.org/users/Scuzzball
// @description  Pause autoplaying HTML5 videos on load. In Firefox just go into about:config and look for media.autoplay.enabled and set to false.
// @version      1
// @include      *
// ==/UserScript==

var videos = document.getElementsByTagName('video');
window.addEventListener('load', stopVideo, false);
function stopVideo()
{
    for (var i=0; i<videos.length; i++)
    {
        videos[i].pause();
        video.currentTime = 0;
    }
}