// ==UserScript==
// @name     Manganelo/Mangakakalot Left/Right Arrow Key Navigation
// @author  sm00nie
// @version  1.01
// @description left and right arrow key navigation to the previous or next manga in the series
// @grant    none
// @include /^https?:\/\/(?:www\.)?(manganelo\.com|mangakakalot\.com)(?:.*)$/
// @require http://code.jquery.com/jquery-latest.js
// @namespace https://greasyfork.org/users/165048
// ==/UserScript==
$(function() {
  $('body').focus();
  $(document).keyup(function(e) {
      switch(e.which) {
          case 37: // left
          $(".next")[0].click();
          break;
          case 39: // right
          $(".back")[0].click();
          break;
          default:
          break;
      }
      e.preventDefault();
  });
});