// ==UserScript==
// @name        webmthing
// @namespace   lelwat
// @description LOOP T3H WEWEBEMS
// @match       *://*/*.webm
// @match       *://*/*.mp4
// @locale      en
// @version     1
// @grant       none
// ==/UserScript==
(function(){
    var d = document;
    var video = document.querySelector('video');
    var handleVisibilityChange = function() {video[d.hidden ? 'pause' : 'play']();}
    try {
        d.addEventListener("visibilitychange", handleVisibilityChange, false)
        handleVisibilityChange();
    }catch(err){
        console.log(err.message);
        console.log(err.stack);
    };
    video.loop = true;
})()