// ==UserScript==
// @name        loop ylilauta videos
// @namespace   ylilauta
// @description loop ylilauta videos by adding a "loop" attribute to video tags
// @include     http://ylilauta.org/*
// @version     1
// @grant       none
// ==/UserScript==

videos = document.evaluate('//video', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i = 0; i < videos.snapshotLength; i++) {
  var vid = videos.snapshotItem(i);
  vid.loop = "true";
}