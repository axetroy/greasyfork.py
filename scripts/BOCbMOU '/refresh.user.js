// ==UserScript==
// @name        refresh
// @namespace   1
// @include     http://www.eador.com/B2/viewforum.php?f=29
// @include     http://eador.com/B2/viewforum.php?f=29
// @version     1.01
// @grant       none
// @description Autoreload tab
// ==/UserScript==

var x = 5; // указывать время в минутах

setTimeout(function(){ location.reload(); }, x*60*1000);