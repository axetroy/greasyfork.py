// ==UserScript==
// @name         慕课网视频弹出式播放 BY:Aochong
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.imooc.com/video/*
// @grant        none
// @require     http://cdn.staticfile.org/jquery/2.1.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    var video = $("#J_Box");

    function pop(video) {
        video.css("width","500px");
        video.css("height","400px");
        video.css("position","fixed");
        video.css("right","0");
        video.css("bottom","0");
        video.css("z-index","99");
    }

    function recover(video) {
        video.css("width","");
        video.css("height","100%");
        video.css("position","");
        video.css("right","");
        video.css("bottom","");
        video.css("z-index","");
    }
    $(document).scroll(function() {
        console.log($(document).scrollTop())
        if($(document).scrollTop() > 500) {
            console.log("tt");
            pop(video);
        } else {
            console.log("ii");
            recover(video);
        }
    });
})();