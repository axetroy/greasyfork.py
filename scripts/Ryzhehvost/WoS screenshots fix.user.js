// ==UserScript==
// @name        WoS screenshots fix
// @description WoS screens fix
// @include     http://www.worldofspectrum.org/*
// @version     1
// @grant       none
// @namespace https://greasyfork.org/users/2205
// ==/UserScript==
+function(){
var xywka = document.getElementsByTagName('img');
for (var i=xywka.length-1; i>=0; i--) {
    if (xywka[i].src.indexOf('showscreen.cgi') + 1) {
	    xywka[i].src="http://www.worldofspectrum.org/pub/sinclair/"+xywka[i].src.substring(53);
	}
  }
}();