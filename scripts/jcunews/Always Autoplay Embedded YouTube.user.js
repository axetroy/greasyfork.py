// ==UserScript==
// @name        Always Autoplay Embedded YouTube
// @namespace   AlwaysAutoplayEmbeddedYouTube
// @description Always autoplay embedded YouTube video
// @author      jcunews
// @include     https://www.youtube.com/embed?*
// @include     https://www.youtube.com/embed/*
// @version     1.0.0
// @grant       none
// ==/UserScript==

if (!(/[?&]autoplay=1/).test(location.search)) {
  document.querySelector(".ytp-large-play-button").click();
}
