// ==UserScript==
// @name        spiegel.de: deaktiviere Overscrolling
// @description entfernt die Weiterleitung auf die Hauptseite beim Scrollen eines Artikelendes
// @namespace   https://greasyfork.org/en/forum/profile/5767/LittlePluto
// @match       *://www.spiegel.de/*.html
// @match       *://www.spiegel.de/*.html#*
// @match       *://www.spiegel.de/*/
// @match       *://www.spiegel.de/*/#ref=ressortblock
// @match       *://www.spiegel.de/forum/votes/a-589480.html
// @exclude-match     *://www.spiegel.de/*/archiv*.html
// @exclude-match     *://www.spiegel.de/fotostrecke/*.html
// @exclude-match     *://www.spiegel.de/fotostrecken/*
// @exclude-match     *://www.spiegel.de/nachrichtenarchiv/
// @exclude-match     *://www.spiegel.de/video/*
// @exclude-match     *://www.spiegel.de/forum/
// @exclude-match     *://www.spiegel.de/forum/*/
// @exclude-match     *://www.spiegel.de/forum/*thread*.html
// @exclude-match     *://www.spiegel.de/international/*
// @noframes
// @version     1.6
// @grant       none
// ==/UserScript==
contentEval(main);

function main() {
  $(window).unbind("scroll.spPageOverscroll"); //for Tampermonkey
  sp_webcfg_global.pageOverscroll = false; //for Violentmonkey and Greasemonkey
}
function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();';
  } // Create a script node holding this  source code.

  var script = document.createElement('script');
  script.setAttribute('type', 'application/javascript');
  script.textContent = source;
  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}