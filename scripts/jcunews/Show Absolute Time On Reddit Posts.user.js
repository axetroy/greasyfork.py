// ==UserScript==
// @name        Show Absolute Time On Reddit Posts
// @namespace   ShowAbsoluteTimeOnRedditPosts
// @description Show absolute time of Reddit posting time in addition to the relative time. Applies for links, comments, and messages.
// @version     1.1.1
// @author      jcunews
// @include     https://*.reddit.com/*
// @grant       none
// ==/UserScript==

(function() {
  var eles = document.querySelectorAll(".tagline > time, .head > time"), i, parentNode, ele;
  for (i = eles.length-1; i >= 0; i--) {
    eles[i].classList.remove("live-timestamp");
    eles[i].textContent += " (" + eles[i].getAttribute("title") + ")";
  }
})();
