// ==UserScript==
// @name        LeclercDrive-PanierSansSuggestions
// @namespace   Filtres
// @description Ferme automatiquement les suggestions du panier quand la page est chargée entièrement.
// @include     http://fd*-courses.leclercdrive.fr/magasin-*/detail-panier.aspx
// @version     1
// @grant       none
// ==/UserScript==

window.onload = function() {
  var anchors = document.getElementsByTagName("a");
  for (var i=0; i<anchors.length; i++) {
    if (anchors[i].className.indexOf("SupprimeCrossUp") >= 0) {
      anchors[i].click();
    }
  }
}