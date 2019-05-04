// ==UserScript==
// @name Unscroll Golem Comments
// @author CennoxX
// @description Öffnet bei Golem den ersten statt den aktuellsten Kommentar
// @include https://www.golem.de/*
// @contact cesar.bernard@gmx.de
// @version 0.2.1
// @namespace https://greasyfork.org/users/21515
// ==/UserScript==
var themenstarts = document.getElementById('comments').getElementsByClassName('meta');
for (var i = 0; i <= themenstarts.length + 2; i++) {
  themenstarts[0].parentNode.removeChild(themenstarts[0]);
}
var AllLinks = document.getElementById('comments').getElementsByTagName('a');
for (var l = 0; l < AllLinks.length; l++) {
  if (AllLinks[l].href.indexOf('#') != - 1) {
    AllLinks[l].href = AllLinks[l].href.split('#') [0] + '#thread-detail';
  }
}
