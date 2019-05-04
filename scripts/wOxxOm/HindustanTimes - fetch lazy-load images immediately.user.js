// ==UserScript==
// @name        HindustanTimes - fetch lazy-load images immediately
// @description Fetch lazy-load images immediately at document load
// @include     http://www.hindustantimes.com/*
// @version     1.0.1
// @namespace   wOxxOm.scripts
// @author      wOxxOm
// @license     MIT License
// @run-at      document-start
// @grant       none
// @require     https://greasyfork.org/scripts/12228/code/setMutationHandler.js
// ==/UserScript==

setMutationHandler(document, 'img.lazy', function(nodes) {
  nodes.forEach(function(n) {
    n.src = n.dataset.original;
    n.classList.remove('lazy');
  });
  return true;
});
