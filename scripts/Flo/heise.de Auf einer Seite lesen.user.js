// ==UserScript==
// @name        heise.de Auf einer Seite lesen
// @namespace   
// @description opens articles always on one page
// @include     https://www.heise.de/*
// @version     8
// @grant       none
// ==/UserScript==



var links = document.evaluate("//a[contains(@href, 'meldung') or contains(@href, 'tp/features') or contains(@href, 'make/artikel') or contains(@href, 'autos/artikel')]", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i=0; i < links.snapshotLength; i++) 
{ 
  var thisLink = links.snapshotItem(i); 
  thisLink.href = thisLink.href.replace(/\.html\?|\.html/,'.html?artikelseite=all&seite=all&');
} 