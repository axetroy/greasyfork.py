// ==UserScript==
// @name AbyssusMultiCases
// @description Outil pour cocher plusieurs cases sur Abyssus
// @version  0.1.0
// @grant none
// @match https://*.abyssus.games/*
// @include https://www.abyssus.games/
// @namespace https://greasyfork.org/users/184736
// ==/UserScript==

window.onmousemove = function (e) {
  if (!e) e = window.event;
  if (e.shiftKey) {
      var target = document.querySelectorAll( ":hover" );
      target[target.length-1].checked = true;
  }
}