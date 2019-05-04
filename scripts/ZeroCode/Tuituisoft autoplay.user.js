// ==UserScript==
// @name         Tuituisoft autoplay
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *tuituisoft.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var i = 0;
    var interval = setInterval(autoPlay, 100);

    function autoPlay(){
        i++;
        var videos = document.getElementsByTagName('video');
        if(videos.length) {
            var video = videos[0];
            video.play();
            setTimeout(function(){
                var video = document.getElementsByTagName('video')[0];
                video.playbackRate = 1.5;
                video.volume = 1;
                video.addEventListener("ended",function(){$('.player-menu-bn a')[1].click();});
            }, 500);
            clearInterval(interval);
        }
        if(i>10){
            clearInterval(interval);
        }
    }
})();