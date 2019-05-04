// ==UserScript==
// @name         Do not track click link 
// @description  try track me click on forum.dobreprogramy.pl, remove redirect.
// @match        https://forum.dobreprogramy.pl/
// @include      https://forum.dobreprogramy.pl/*
// @icon         https://i.imgur.com/aoGUAKi.png
// @homepageURL  https://greasyfork.org/pl/scripts/37660-do-not-track-click-link
// @version      1.0.14
// @author       krystian3w
// @run-at       document-end
// @grant        none
// @compatible   firefox Firefox
// @compatible   chrome Chrome
// @namespace https://greasyfork.org/users/167625
// ==/UserScript==

(function () {
  'use strict';

  var body = document.getElementsByTagName("body")[0];

  window.addEventListener("DOMContentLoaded", function () {
    $('.regular.contents .cooked a[href*="//"]').addClass('no-track-link');
    $('.regular.contents .cooked a[href^="/uploads/"]').addClass('no-track-link');
    $('.excerpt a[href*="//"]').addClass('no-track-link');
    $('.excerpt a[href^="/uploads/"]').addClass('no-track-link');
  });

  //fallback

  body.addEventListener("mouseover", function () {
    $('.regular.contents .cooked a[href*="//"]').addClass('no-track-link');
    $('.regular.contents .cooked a[href^="/uploads/"]').addClass('no-track-link');
    $('.excerpt a[href*="//"]').addClass('no-track-link');
    $('.excerpt a[href^="/uploads/"]').addClass('no-track-link');
  });

})();