// ==UserScript==
// @namespace     http://javascript.about.com
// @author        Stephen Chapman
// @name          Exit Block Blocker
// @description   Blocks onbeforeunload
// @include       *
// @version 0.0.1.20161108220241
// ==/UserScript==

var th = document.getElementsByTagName('body')[0];
var s = document.createElement('script');
s.setAttribute('type','text/javascript');
s.innerHTML = "window.onbeforeunload = function() {}";
th.appendChild(s);
