// ==UserScript==
// @name        onmeda adblock notice remover
// @description:en removes the adblocker notice from the website
// @namespace   ps
// @include     *onmeda.de*
// @version     1
// @grant       none
// ==/UserScript==
$(function () {
  window.setTimeout(function () {
    var bc = $('body').children();
    bc[bc.length - 1].setAttribute('style', 'visibility:hidden;')
  }, 2000);
});
