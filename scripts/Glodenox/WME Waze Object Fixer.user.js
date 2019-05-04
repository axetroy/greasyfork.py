// ==UserScript==
// @name         WME Waze Object Fixer
// @namespace    http://www.tomputtemans.com/
// @description  This script fixes the various scripts that rely on the deprecated Waze JavaScript object. Make sure this script is executed before all other scripts.
// @include      /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @version      0.1
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  function init() {
    if (typeof Waze === 'undefined' && typeof W === 'undefined') { // Shouldn't ever happen, but still...
      setTimeout(init, 100);
      return;
    }
    if (typeof Waze === 'undefined') {
      window.Waze = W;
      console.log('Waze Object Fixer has added the Waze object back again');
    }
  }
  init();
})();