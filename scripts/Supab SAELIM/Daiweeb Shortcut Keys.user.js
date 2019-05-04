// ==UserScript==
// @name         Daiweeb Shortcut Keys
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add Shortcut Keys to daiweeb
// @author       KamiGim
// @match        *://daiweeb.org/*
// @grant        none
// ==/UserScript==

(function() {
  var furigana = document.getElementsByClassName("tk-topbar-toggle-furigana-icon")[0];
  var subtitle = document.getElementById("subtitles-switch");
  var meaning = document.getElementsByClassName("tk-topbar-toggle-reference-icon")[0];
  var toggleFurigana = function(e) {
    if (e.keyCode === 70) { // f
      furigana.click();
    }
  };
  var toggleSubtitle = function(e) {
    if (e.keyCode === 83) { // s
      subtitle.click();
    }
  }
  var toggleMeaning = function(e) {
    if (e.keyCode === 69) { // e
      meaning.click();
    }
  };
  window.addEventListener('keydown', toggleFurigana);
  window.addEventListener('keydown', toggleMeaning);
  window.addEventListener('keydown', toggleSubtitle);
})();
