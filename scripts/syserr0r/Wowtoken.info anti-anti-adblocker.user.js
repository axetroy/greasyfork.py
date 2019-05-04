// ==UserScript==
// @name         Wowtoken.info anti-anti-adblocker
// @namespace    syserr0r
// @description  Fools the anti-adblocker on wowtoken.info
// @lastupdated  2017-09-13
// @version      1.0
// @license      Public Domain
// @include      https://wowtoken.info/
// @grant        none
// ==/UserScript==

window.adsbygoogle = { push: function() { } };
window.getComputedStylefn = window.getComputedStyle;
window.getComputedStyle = function(x) {
  if (x.className == 'adsbygoogle')
    return {
      display: 'block',
      position: 'static',
      overflowY: 'visible',
      overflowX: 'visible',
      overflow: 'visible',
      opacity: '1',
      height: '80px',
      width: '200px',
    }
  else
    return window.getComputedStylefn(x);
};