// ==UserScript==
// @name         WME-Deprecation-Warning-Fixer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Andrei Pavlenko
// @match        https://www.waze.com/*editor*
// @grant        none
// ==/UserScript==

(function init() {
  if (window.W) {
    window.Waze = window.W;
  } else {
    setTimeout(init, 150);
  }
})();
