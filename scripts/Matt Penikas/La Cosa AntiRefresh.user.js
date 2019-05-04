// ==UserScript==
// @name        La Cosa AntiRefresh
// @include     http://www.beppegrillo.it/la_cosa/
// @description	Elimina il refresh della pagina
// @version     1.0
// @grant       none
// @namespace https://greasyfork.org/users/4153
// ==/UserScript==

mr = document.getElementById("meta-refresh");
mr.parentNode.removeChild(mr);