// ==UserScript==
// @name        Reddit: Remove 'np'
// @namespace   greasyfork.org/en/users/9965
// @description Changes np links to regular links
// @version     1.0
// @match       http://www.reddit.com/*
// @match       https://www.reddit.com/*
// @grant       none
// ==/UserScript==

document.addEventListener("DOMContentLoaded", fixLinks, false);

if( document.readyState === "complete" ) {
  fixLinks();
}

function fixLinks() {
  Array.forEach( document.links, function(a) {
    a.href = a.href.replace(/np\.reddit/i, "www.reddit");
  });
}


