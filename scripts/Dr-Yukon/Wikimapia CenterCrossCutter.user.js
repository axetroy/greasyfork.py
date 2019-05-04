// ==UserScript==
// @name           Wikimapia CenterCrossCutter
// @description    Удаление центрального крестика на картах Викимапии
// @icon           http://wikimapia.org/favicon.ico
// @include        http*://*wikimapia.org/*
// @grant          none
// @version 0.0.1.20141212214624
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var link = document.getElementById("map-center-cross");
link.parentNode.removeChild(link);