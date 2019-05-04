// ==UserScript==
// @name        spiegel.de: entferne Last Image Link
// @description entfernt die Links auf die Hauptseite vom letzen Bild einer Fotostrecke auf spiegel.de
// @namespace   https://greasyfork.org/en/forum/profile/5767/LittlePluto
// @match       *://www.spiegel.de/fotostrecke/*.html
// @noframes
// @version     1.2
// @grant       none
// ==/UserScript==

var subElement = document.getElementById("js-biga-width");
//image
var link = subElement.querySelector('div.biga-image > a[href="/#ref=gallery-last-image"]');
if (link){ //null is falsy
  link.removeAttribute('href');
  // Entfernt die Links über und unter dem Bild
  var selectors = 'a[href="/#ref=gallery-last-image"].home-link, a[href="/#ref=gallery-last-image"].link-angle-right';
  subElement.querySelectorAll(selectors).forEach((element) => element.parentElement.removeChild(element));
}