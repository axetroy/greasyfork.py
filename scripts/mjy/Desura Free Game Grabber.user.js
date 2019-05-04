// ==UserScript==
// @name        Desura Free Game Grabber
// @author      mjy
// @namespace   steamcommunity.com/id/mjy
// @description Get free games without running Desura client.
// @include     http://www.desura.com/games/*
// @version     0.12
// @icon        http://www.desura.com/favicon.ico
// @license     GPL version 3 or any later version
// @grant       none
// ==/UserScript==

var links = document.getElementsByTagName("a");
var regex = /^(https?:\/\/)[^.]+\.(desura\.com\/)(games\/[a-z0-9-]+\/play\/)(.+)$/ig;
for (var i=0,imax=links.length; i<imax; i++) {
   links[i].href = links[i].href.replace(regex,"https://secure.$2cart/add/1/$4");
}