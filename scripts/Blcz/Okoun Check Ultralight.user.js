// ==UserScript==
// @name        Okoun Check Ultralight
// @namespace   ocl.okoun.cz
// @description Automatický reload oblíbených na okoun.cz
// @include     https://www.okoun.cz/favourites.jsp*
// @author      BALCARENKO
// @version     1.0
// @grant       none
// ==/UserScript==

(function() {
  
  // automaticky reload
  window.setTimeout(function(){location.reload(true)}, 77*1000);
  
})();

