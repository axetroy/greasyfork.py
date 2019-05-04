// ==UserScript==
// @name	 Sortowanie wyników Allegro
// @include	 https://allegro.pl/*
// @version      1.1
// @author       Vomar
// @match        https://greasyfork.org/en/script_versions/new
// @description  Skrypt sortowanie po trafności automatycznie zmienia na "cena z dostawą od najniższej" jak na polaka przystało xD
// @namespace https://greasyfork.org/users/156999
// ==/UserScript==
window.addEventListener('load', function(){
var url = window.location.toString();
if(window.location.href.indexOf("order=m") > -1) {
window.location = url.replace("order=m", "order=d");
}
}, false);