// ==UserScript==
// @name	Open external links in new tab
// @description	Открытые внешних ссылок в новой вкладке
// @namespace	https://greasyfork.org/users/19952-xant1k-bt
// @include	http://*/*
// @include	https://*/*
// @version	1.0
// ==/UserScript==

function externalLinks() {
  for(var c = document.getElementsByTagName("a"), a = 0;a < c.length;a++) {
    var b = c[a];
    b.getAttribute("href") && b.hostname !== location.hostname && (b.target = "_blank")
  }
}
;
externalLinks();