// ==UserScript==
// @name        focus
// @namespace   1
// @include     http://www.eador.com/B2/posting.php?mode=reply*
// @include     http://eador.com/B2/posting.php?mode=reply*
// @version     1
// @grant       none
// @description Focus textarea
// ==/UserScript==

document.getElementsByName("message")[0].focus();