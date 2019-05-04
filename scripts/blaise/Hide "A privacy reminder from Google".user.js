// ==UserScript==
// @name        Hide "A privacy reminder from Google"
// @description Hide "A privacy reminder from Google" in Google homepage footer and above search results.
// @include     https://*.google.*
// @version     2017.01.02
// @grant       none
// @namespace https://greasyfork.org/users/2969
// ==/UserScript==

let s = document.createElement('style')
s.textContent = `

  [jsaction^="dg_dismissed"] ~ * ,
  [jsaction^="dismiss_warmup"] {
    display: none !important;
  }

`;

document.head.appendChild(s);
