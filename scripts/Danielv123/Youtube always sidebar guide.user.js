// ==UserScript==
// @name        Youtube always sidebar guide
// @namespace   Danielv123
// @description Prevents youtube from hiding the sidebar/guide when opening a video
// @include     https://www.youtube.com/*
// @version     1
// @grant       none
// ==/UserScript==
setInterval(function () {
  document.getElementsByTagName('html') [0].setAttribute('class', 'show-guide guide-pinned');
}, 100)
