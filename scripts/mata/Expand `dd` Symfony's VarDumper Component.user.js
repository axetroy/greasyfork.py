// ==UserScript==
// @version 0.1
// @namespace curtisblackwell
// @name         Expand `dd` Symfony's VarDumper Component
// @description  see: https://laracasts.com/discuss/channels/general-discussion/expanding-dd-vardumper-by-default
// @author       curtisblackwell
// @include      *://*.test/*
// ==/UserScript==

(function() {
  'use strict';

  var compacted = document.querySelectorAll('.sf-dump-compact');

  for (var i = 0; i < compacted.length; i++) {
    compacted[i].className = 'sf-dump-expanded';
  }
})();