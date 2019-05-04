// ==UserScript==
// @name         知乎Gif自动加载
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Cooper
// @match        *://*.zhihu.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
    // Your code here...
    var players = document.querySelectorAll(".GifPlayer");
    players.forEach(function(item){
        item.classList.add("isPlaying");
    })
    var gifDoms = document.querySelectorAll(".column-gif");
    gifDoms.forEach(function(item){
        item.src = item.src.replace(/jpg$/g,"gif");
    })
})();