// ==UserScript==
// @name        eRepublik top news toggler
// @namespace   NCeRepTools
// @description Toggle button for the top news on eRepublik
// @version     1.0
// @license     CC BY 4.0
// @author      Nicolae Crefelean
// @include     https://www.erepublik.com/*
// @grant       none
// ==/UserScript==

jQuery(function() {
  if (/^\/[a-z]{2}$/.test(document.location.pathname)) {
    jQuery('#hpTopNews h1').append(' [<b id="toggleTopNews" style="cursor: pointer">-</b>]');
    if (localStorage.getItem('TopNewsVisible') != null && localStorage.getItem('TopNewsVisible') == 0) {
      toggleTopNews();
    }

    function toggleTopNews() {
      var newsVisible = jQuery('#hpTopNews div.media_widget').is(':visible');
      jQuery('#hpTopNews div.media_widget').toggle();
      jQuery('#toggleTopNews').html(newsVisible ? '+' : '-');
      localStorage.setItem('TopNewsVisible', newsVisible ? 0 : 1);
    }

    jQuery('#toggleTopNews').on('click', function() {
      toggleTopNews();
    });
  }
});
