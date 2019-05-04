// ==UserScript==
// @name        loop video files
// @namespace   hvideolooper
// @author      h
// @description enables looping when you've opened a video file
// @include     *.webm
// @include     *.mp4
// @run-at      document-start
// @version     0
// @grant       none
// ==/UserScript==

document.getElementsByTagName("video")[0].setAttribute("loop", "true");