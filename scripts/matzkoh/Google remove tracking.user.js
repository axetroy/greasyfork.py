// ==UserScript==
// @name        Google remove tracking
// @description Keep url on mousedown
// @version     1.0.0
// @include     https://www.google.tld/search?*
// @grant       none
// @author      xulapp
// @namespace   https://twitter.com/xulapp
// @license     MIT
// ==/UserScript==
// jshint esnext:true, moz:true, globalstrict:true, browser:true
'use strict';

document.addEventListener('mousedown', ({target: a}) => {
  while (a && a.localName !== 'a')
    a = a.parentElement;

  if (a && a.matches('.r a, .l, .fl'))
    a.removeAttribute('onmousedown');
}, true);
