// ==UserScript==
// @name         anime1 網頁全螢幕
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  影片網頁全螢幕
// @author       Kimika
// @match        https://anime1.me/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    try{
        var video = document.querySelector('.entry-content iframe');
        video.style.width = '100vw';
        video.style.height = '100vh';
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.zIndex = '1';
    }catch(e){
        console.log('video player not found');
    }
})();