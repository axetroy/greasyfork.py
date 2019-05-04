// ==UserScript==
// @name Instapaper Reading Time
// @namespace   hghwng
// @match *://*.instapaper.com/*
// @grant none
// @description Prints item count and total time of current item list in title 
// @version 0.0.1.20180501163143
// ==/UserScript==


(function() {
  var items = Array.from(document.querySelectorAll('.meta_read_time.meta_item'));
  var minutes = items.map(x => parseInt(x.innerHTML.match(/(\d+) min/)[1]));
  var total = minutes.reduce((x, y) => (x + y));
  document.title += `: ${items.length} items in ${total} min`;
})();