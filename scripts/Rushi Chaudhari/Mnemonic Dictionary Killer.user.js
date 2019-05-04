// ==UserScript==
// @name         Mnemonic Dictionary Killer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  An efficient UI for the site for mobile devices
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @author       rushic24@gmail.com
// @match        https://mnemonicdictionary.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('.col-lg-3').empty();
    $('.float-whats-app').remove();

    document.body.addEventListener('keypress', e => {
  if (e.key === 'ArrowRight') {
    $(".slick-next").click()
  }
   if (e.key === 'ArrowLeft') {
    $(".slick-prev").click()
  }
});

})();