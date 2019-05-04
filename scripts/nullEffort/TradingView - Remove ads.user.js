// ==UserScript==
// @name         TradingView - Remove ads
// @version      0.1
// @description  Does what it says.
// @author       DjBonadoobie
// @icon         http://keycdn.mturkcrowd.com/data/avatars/l/0/132.jpg?1452627961
// @include      https://www.tradingview.com/chart/*
// @grant        none
// @namespace https://greasyfork.org/users/81651
// ==/UserScript==

(function() {
  'use strict';
  const checkAd = setInterval(() => {
    const adBox = document.getElementById('tv-toasts');
    if (adBox) {
      adBox.remove();
      console.log('ad removed.');
    } else {
      console.log('no ad present.');
    }
  }, 5000);
})();
