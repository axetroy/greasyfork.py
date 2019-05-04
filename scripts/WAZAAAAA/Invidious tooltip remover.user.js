// ==UserScript==
// @name Invidious tooltip remover
// @namespace localhost
// @description hide the annoying video title tooltip on mouse hover that overlaps with videos
// @version 1.0
// @match https://invidio.us/watch*
// ==/UserScript==

var elements=document.getElementsByClassName('vjs-tech');
for(var i=0;i<elements.length;i++){elements[i].setAttribute('title','');}