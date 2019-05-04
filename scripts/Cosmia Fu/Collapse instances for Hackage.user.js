// ==UserScript==
// @name Collapse instances for Hackage
// @namespace Violentmonkey Scripts
// @description:en Automatically collapse all instances on Hackage.
// @match *://hackage.haskell.org/package/*/docs/*.html
// @grant none
// @version 0.0.1.20171110153442
// ==/UserScript==

(function(){
  "use strict";
  window.addEventListener('load', function() {
    document.querySelectorAll("p.collapser")
      .forEach(function (node) { 
          node.click();
      });
  });
})();
