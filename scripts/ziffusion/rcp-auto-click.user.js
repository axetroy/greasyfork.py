// ==UserScript==
// @name        rcp-auto-click
// @namespace   ziffusion.com
// @description Autoclicks RCP articles.
// @include     http*://www.realclearpolitics.com/*
// @version     1
// @grant       none
// ==/UserScript==

var link = unsafeWindow.$(".more-link > a");

if (link && link[0] && link[0].href && link[0].href != document.URL)
{
  window.open(link[0].href)
}