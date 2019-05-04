// ==UserScript==
// @name           Fixed to Absolute Important
// @namespace      https://greasyfork.org/en/scripts/369282-fixed-to-absolute-important
// @description    Stops elements from following you as you scroll down the page
// @version        1
// ==/UserScript==

// https://gist.github.com/rofrol/a52a36102daf59eeef91c715c0ae402b
// Based on https://alisdair.mcdiarmid.org/kill-sticky-headers/

var i, elements = document.querySelectorAll('body *');

for (i = 0; i < elements.length; i++) {
  if (getComputedStyle(elements[i]).position.startsWith('fixed')) {
    elements[i].style.setProperty("position", "absolute", "important");
  }
}