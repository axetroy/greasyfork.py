// ==UserScript==
// @name         XKCD Right Click
// @namespace    https://greasyfork.org/en/users/28185-bit
// @version      0.1
// @description  Enables a new right click menu on all XKCD comics.
// @author       Bit
// @include      http://xkcd.com/*
// @include      https://xkcd.com/*
// @grant        none
// ==/UserScript==

(function() {
  let element = document.createElement("SCRIPT");
  element.src = "/1975/alto/comic.js";
  document.body.appendChild(element);
})();