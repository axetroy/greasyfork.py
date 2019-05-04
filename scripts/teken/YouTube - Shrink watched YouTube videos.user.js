// ==UserScript==
// @name       YouTube - Shrink watched YouTube videos
// @version    1.03 beta
// @description Youtube videos will be shrinked so you can easily/visuallyClearly skip them.
// @description Based in the work of Aviem Zur "YouTube - Hide watched YouTube videos" (http://userscripts-mirror.org/scripts/review/149842). Forum: https://greasyfork.org/en/forum/discussion/comment/21182.
// @description I understand it will work best with "Better YouTube Watch History" (https://chrome.google.com/webstore/detail/better-youtube-watch-hist/lleajdkalfbohpinoaekajagdefaeckd?hl=en)
// @match      http://www.youtube.com/*
// @match      http://youtube.com/*
// @match      https://www.youtube.com/*
// @match      https://youtube.com/*
// @license    GPLv3 - http://www.gnu.org/licenses/gpl-3.0.en.html
// @copyright  teken
// @namespace https://greasyfork.org/users/17433
// ==/UserScript==

var hide = function() {
    var aElementList = [];
    var watchedList;
    
    watchedList = document.evaluate("//div[contains(text(),'WATCHED')]/../../../..",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < watchedList.snapshotLength; i++) {var w = watchedList.snapshotItem(i);aElementList.push(w);}
    
    watchedList = document.evaluate("//span[contains(text(),'WATCHED')]/../../../..",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < watchedList.snapshotLength; i++) {var w = watchedList.snapshotItem(i);aElementList.push(w);}
    
    watchedList = document.evaluate("//span[@class='resume-playback-background']/../../..",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < watchedList.snapshotLength; i++) {var w = watchedList.snapshotItem(i);aElementList.push(w);}

    watchedList = document.evaluate("//span[@class='resume-playback-progress-bar']/../../..",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < watchedList.snapshotLength; i++) {var w = watchedList.snapshotItem(i);aElementList.push(w);}

    for (var i = 0; i < aElementList.length; i++) {
        var w = aElementList[i];
        var pic = w.getElementsByClassName("yt-thumb-default")[0]; //tiled list of videos is this one
        var bRows=false;
        if(!pic){
            bRows=true;
            pic = w.getElementsByClassName("yt-thumb video-thumb")[0]; // one video per row is this one
        }
        if(!pic){
            bRows=true;
            pic = w.getElementsByClassName("thumb-link spf-link yt-uix-sessionlink")[0]; // one video per row is this one
        }
        pic.style.display = 'none';
        
        if(bRows){
            w.style.height = '10px';w.style.overflow = 'hidden';
        }
        w.style.backgroundColor = "#401030";
    }
};

document.addEventListener("DOMSubtreeModified", function() { hide(); } , false);
