// ==UserScript==
// @name       YouTube AutoPause
// @version    1.0
// @description (seems to be not working!) Automatically pause YouTube videos when they appear
// @match      https://*.youtube.com/watch*
// @match      http://*.youtube.com/watch*
// @namespace https://greasyfork.org/users/153157
// ==/UserScript==

var buttons = document.getElementsByClassName("ytp-play-button");
for (var i in buttons) {
    buttons[i].click();
}