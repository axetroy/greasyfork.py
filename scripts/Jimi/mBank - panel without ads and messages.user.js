// ==UserScript==
// @name             mBank - panel without ads and messages
// @name:pl          mBank - panel bez reklam i wiadomości
// @namespace        https://greasyfork.org/pl/users/174756-jimi
// @version          1.0
// @description      remove messages and ads from mBank panel...
// @description:pl   usuwa okienko wiadomości i reklam z panelu mbank...
// @author           jimi
// @include          https://online.mbank.pl/*
// @grant            none
// ==/UserScript==

(function() {
  'use strict';
  var head = document.querySelector('head');
  var st1 = document.createElement('style');
  st1.innerHTML = '.messages-region {display: none;} .accounts-history-region {width: 100% !important;} .accounts-list {width: 100% !important;} .operation-row {width: 99% !important;}';
  head.appendChild(st1);
})();