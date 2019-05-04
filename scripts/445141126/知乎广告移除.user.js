// ==UserScript==
// @name         知乎广告移除
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       wangb
// @match        *://www.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeAllAd () {
      document.querySelectorAll('.AdblockBanner').forEach(function (ad) {ad.style.display = 'none';});
      var itemList = document.querySelectorAll('.Card.TopstoryItem');
      itemList.forEach(function (item) {
        if (item.querySelectorAll('.TopstoryItem-advertButton').length) {
          item.style.display = 'none';
        }
      });
    }

    var ob = new MutationObserver(removeAllAd);
    ob.observe(document.querySelector('.TopstoryMain > div'), {childList: true});

    removeAllAd();
})();