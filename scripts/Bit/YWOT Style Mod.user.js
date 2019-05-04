// ==UserScript==
// @name         YWOT Style Mod
// @namespace    https://greasyfork.org/en/users/28185-bit
// @version      1.1
// @description  Your World Of Text style modification for alignment of blocks and tiles.
// @author       Bit
// @include      http*://www.yourworldoftext.com/*
// @grant        none
// ==/UserScript==

function addCss(style) {
  var head = document.head;
  var link = document.createElement("style");
  link.type = "text/css";
  link.innerHTML = style;
  head.appendChild(link);
  return link;
}

addCss(".tilecont { border: 3px solid #44F; } .tilecont > table > tbody > tr > td { border: 1px solid #77E; }");