// ==UserScript==
// @name        WIKIPlayer Auto Pause
// @description Tumblr Autoplay is shite
// @include     http://www.wikplayer.com/wik.html*
// @grant       none
// @version     0.1
//
// @namespace https://greasyfork.org/users/4115
// ==/UserScript==
window.addEventListener('load', function () {
    console.log("WikPlayer found, pausing");
    WIK.pause();
}, false);
