// ==UserScript==
// @name        Gmail - Rid the bold!
// @description Remove the bold from new emails on Gmail (as of 10/1)
// @include     https://mail.google.com/mail/*
// @version 0.0.1
// @namespace https://greasyfork.org/users/217094
// ==/UserScript==

(function() {
  window.setInterval(function() {
    Array.from(document.getElementsByClassName("zF")).forEach(function(element, index, array) {
      element.style.fontWeight = 'normal';
    });
    Array.from(document.getElementsByClassName("bqe")).forEach(function(element, index, array) {
      element.style.fontWeight = 'normal';
    });
    Array.from(document.getElementsByClassName("bq3")).forEach(function(element, index, array) {
      element.style.fontWeight = 'normal';
    });
  }, 500);
})();