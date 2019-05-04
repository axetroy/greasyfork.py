// ==UserScript==
// @name       Imgur direct links
// @description Replace all Imgur links to direct image links in Reddit
// @license     Apache 2.0
// @namespace   gobelpepitai
// @include     http://*.reddit.com/*
// @include     https://*.reddit.com/*
// @version     1
// @grant       none
// ==/UserScript==

var links = Array.prototype.slice.call(document.querySelectorAll("a.title"));

for (var i = 0; i < links.length; i++) {
  if (/^https?:\/\/imgur\.com\/[a-zA-Z0-9]+$/.test(links[i].href)) {
    links[i].href += ".png";
  }
}