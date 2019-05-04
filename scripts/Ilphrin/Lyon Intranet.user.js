// ==UserScript==
// @name        Lyon Intranet
// @namespace   intra.epitech.eu/planning/
// @description Cliquer pour avoir Lyon...
// @include     https://intra.epitech.eu/planning/*
// @version     1.1
// @grant       none
// ==/UserScript==

window.setTimeout(function() {
  document.querySelector('.country').children[1].children[0].children[1].click();  
}, 3000);
