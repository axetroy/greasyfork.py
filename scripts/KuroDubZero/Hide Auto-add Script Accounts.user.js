// ==UserScript==
// @name         Hide Auto-add Script Accounts
// @version      1.3
// @description  *Poof*
// @author       Ghost
// @include      http://myanimelist.net/manga*
// @include      http://myanimelist.net/anime*
// @grant        none
// @namespace https://greasyfork.org/users/10763
// ==/UserScript==

  $("td.borderClass:contains('spacecowboy')").css("display", "none");
  $("td.borderClass:contains('El_Creador')").css("display", "none");
  $("td.borderClass:contains('d00t')").css("display", "none");
