// ==UserScript==
// @name        fit video to window
// @namespace   hvideolooper
// @author      h
// @description opened video files will fill your browser window
// @include     *.webm
// @include     *.mp4
// @run-at      document-start
// @version     0
// @grant       none
// ==/UserScript==

document.getElementsByTagName("video")[0].setAttribute("width", "100%", "height", "100%");