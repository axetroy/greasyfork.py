// ==UserScript==
// @name        MTurk resize iframe and setfocus
// @namespace   na
// @include     http://www.mturk.com/mturk/*
// @version     1
// @grant       none
// @description Resizes the Mechanical Turk (MTurk) HIT iframe to 1200 and automatically sets the focus to the iframe.
// ==/UserScript==


var a = document.getElementsByTagName("IFRAME");
for (var i=0, len=a.length; i<len; i++) {
  a[i].height="1200"; 
    a[i].focus();
    }

