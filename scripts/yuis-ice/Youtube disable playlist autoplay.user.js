// ==UserScript==
// @name         Youtube disable playlist autoplay
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Disable autoplay on Youtube when You're in any playlist.
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

// youtube disable playlist autoplay
var refreshIntervalId = setInterval(function(){
  if (document.querySelector('#movie_player > div.html5-video-container > video').currentTime > document.querySelector('#movie_player > div.html5-video-container > video').duration-1){
    document.querySelector('#movie_player > div.html5-video-container > video').pause() ;
  }
} , 200);

// ~~~~~~~~~~~
// ## Creator info
// * Homepage
// https://114514.click/to/homepage
// * Twitter
// https://114514.click/to/twitter
// * Facebook
// https://114514.click/to/fb
// * Blog
// https://114514.click/to/blog-of-programming
// * Email
// yuis.twitter+tomainbyall@gmail.com
// ~~~~~~~~~~~