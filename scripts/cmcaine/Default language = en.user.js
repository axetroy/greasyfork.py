// ==UserScript==
// @name        Default language = en
// @description Set the lang attribute of the root html element if not set. For hyphenation.
// @namespace   cmcaine
// @version     1
// @grant       none
// ==/UserScript==

// So hyphens work better.

if (window.document.documentElement.lang == "") {
  window.document.documentElement.lang = "en";
}