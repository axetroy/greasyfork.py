// ==UserScript==
// @name        KAT - Hide Online Friends
// @namespace   Hide Online Friends
// @version     1.04
// @description Adds a button to toggle online friends
// @include   /https?:\/\/kat.cr\/user\/[^\/]+\//
// ==/UserScript==

$("h2[class!='red center'] small").filter(":first").parent().append('<a onclick="$(\'.botmarg10px > .badge\').filter(\':first\').parent().toggle();return false;" title="Toggle Online Friends" class="smallButton siteButton" style="margin-left:10px;"><span>Toggle Online Friends</span></a>');
