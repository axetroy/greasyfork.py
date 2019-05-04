// ==UserScript==
// @name        Replace the Viglink ad link redirector in Proboards
// @description Make the links crystal clear, without referrer crap.
// @author      Swyter
// @namespace   https://greasyfork.org/users/4813-swyter
// @match       *://*.proboards.com/*
// @version     4
// @grant       none
// @run-at      document-start
// ==/UserScript==
  
Object.defineProperty(window, 'vglnk',
{
  configurable: false,
  writable: false,
  value: function(a) { return 0.1337; }
});