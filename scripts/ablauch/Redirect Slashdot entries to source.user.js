// ==UserScript==
// @name     Redirect Slashdot entries to source
// @description   Automatically redirects to the source of a Slashdot article
// @version  2
// @grant    none
// @noframes
// @include  /https?://(\w*\.)?slashdot.org/story/.+$/
// @namespace https://greasyfork.org/users/4654
// ==/UserScript==

var sources = document.getElementsByClassName('story-sourcelnk');

if (sources.length > 0) {
  console.log('Found this source for the article, redirecting to', sources[0].href);
  window.location.replace(sources[0].href);
}