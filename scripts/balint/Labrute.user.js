// ==UserScript==
// @name        Labrute
// @namespace   http://wifi.com
// @include     http://balint.labrute.fr/cellule
// @version     1.1
// @grant       none
// @description labrute
// ==/UserScript==

var elemek = document.getElementsByClassName("levelBar");
var w = document.defaultView.getComputedStyle(elemek[0],null).getPropertyValue("width");
elemek[0].parentElement.previousSibling.previousSibling.innerHTML = elemek[0].parentElement.previousSibling.previousSibling.innerHTML + " (" + w +")";