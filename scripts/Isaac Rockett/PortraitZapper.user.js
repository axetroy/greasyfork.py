// ==UserScript==
// @name           PortraitZapper
// @namespace      kingdomofloathing.com/Drachefly
// @include        http://*.kingdomofloathing.com/charpane.php
// @include        file://*/charpane.php
// @version 0.0.1.20140812160354
// @description kills portrait in KOL
// ==/UserScript==

row = document.getElementsByTagName('tr')[0];
row.deleteCell(0);