// ==UserScript==
// @name bentoblock
// @author Johannes Zorn
// @description Remove Bento from Spiegel Online (Requires Chrome 41+, FF 35+)
// @include http://www.spiegel.de/*
// @version 1.0.2
// @namespace https://github.com/jzorn/bentoblock
// ==/UserScript==

function removeParent(selector) {
  return function(elem) {
    if (!elem || !elem.closest) {
      return;
    }
    var pElem = elem.closest(selector);
    if (pElem) {
      pElem.remove();
    }
  }
}

(function(){
  'use strict';

  document.querySelectorAll('.teaser .bento').forEach(removeParent('.teaser'));
  document.querySelectorAll('a[href*="bento.de').forEach(removeParent('.asset-box'));
  document.querySelectorAll('.module-box.bento')[0].remove();
})();
