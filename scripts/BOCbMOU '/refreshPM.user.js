// ==UserScript==
// @name        refreshPM
// @namespace   1
// @include     http://www.eador.com/B2/privmsg.php?folder=*
// @include     http://eador.com/B2/privmsg.php?folder=*
// @version     1
// @grant       none
// @description Autoreload tab in PM
// ==/UserScript==

setTimeout(function(){ location.reload(); }, 150*1000);