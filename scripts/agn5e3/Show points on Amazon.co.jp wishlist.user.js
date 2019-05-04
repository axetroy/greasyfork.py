// ==UserScript==
// @name         Show points on Amazon.co.jp wishlist
// @namespace    https://greasyfork.org/ja/users/165645-agn5e3
// @version      1.6.4
// @description  Amazon.co.jpの欲しいものリストで、Kindleの商品にポイントを表示しようとします
// @author       agn5e3
// @license      Apache-2.0
// @match        https://www.amazon.co.jp/*/wishlist/*
// ==/UserScript==
(function () {
  'use strict';
  const domParser = new DOMParser();
  const modifyCharacter = ((str) => str.replace(/[\s]+/g, '').replace(/（/, '(').replace(/）/, ')').replace(/：/, ':').replace(/の割引/, '円').replace(/\(/, ' (').replace(/の価格/, ''));
  const setColor = ((str) => {
    let ratio = str.match(/[0-9]+%/);
    if (ratio === null) {
      ratio = 0;
    } else {
      ratio = parseInt(ratio);
    }
    let color;
    if (ratio < 25) {
      color = '#111';
    } else if (ratio < 50) {
      color = '#2ca9e1';
    } else if (ratio < 75) {
      color = '#b3a514';
    } else {
      color = '#e2041b';
    }
    return '<p style="margin:0;color:' + color + '">' + str + '</p>';
  });
  const getPoint = ((html) => {
    const printPrice = html.getElementsByClassName('print-list-price')[0];
    const kindleSave = html.getElementsByClassName('ebooks-price-savings')[0];
    const loyaltyPoint = html.getElementsByClassName('loyalty-points')[0];
    let data = new Object({});
    if (printPrice !== undefined) data.printPrice = setColor(modifyCharacter(printPrice.innerText));
    if (kindleSave !== undefined) data.kindleSave = setColor('割引:' + modifyCharacter(kindleSave.innerText).replace(/￥/, ''));
    if (loyaltyPoint !== undefined) data.loyaltyPoint = setColor(modifyCharacter(loyaltyPoint.innerText));
    return data;
  });
  const showPoint = ((node, data) => {
    const priceSection = node.getElementsByClassName('price-section')[0];
    if (data.printPrice !== undefined) priceSection.insertAdjacentHTML('afterbegin', data.printPrice);
    if (data.kindleSave !== undefined) priceSection.insertAdjacentHTML('beforeend', data.kindleSave);
    if (data.loyaltyPoint !== undefined) priceSection.insertAdjacentHTML('beforeend', data.loyaltyPoint);
    node.getElementsByClassName('a-price-symbol')[0].remove();
    let itemAvailability = node.getElementsByClassName('itemAvailability')[0];
    if (itemAvailability !== undefined) itemAvailability.remove();
    node.getElementsByClassName('a-price-whole')[0].insertAdjacentHTML('afterbegin', '￥');
    node.getElementsByClassName('a-price')[0].classList.add('a-color-price', 'a-size-large');
  });
  const saveCache = ((asin, data) => localStorage.setItem('SPAW_' + asin, JSON.stringify(data)));
  const loadCache = ((asin) => JSON.parse(localStorage.getItem('SPAW_' + asin)));
  const deleteCache = (() => {
    for (const key in localStorage) {
      if (/^SPAW_/.test(key)) {
        localStorage.removeItem(key);
      }
    }
  });
  const expirationCache = (() => {
    const cacheTime = localStorage.getItem('SPAW_CACHE_TIME');
    if (cacheTime !== null && Date.now() <= parseInt(cacheTime) + 21600000) {
      return;
    } else {
      deleteCache();
      localStorage.setItem('SPAW_CACHE_TIME', Date.now());
    }
  });
  const fetchPoint = ((node) => {
    if (node.querySelectorAll && node.getElementsByClassName('SPAW_FETCHED')[0] === undefined && node.querySelector('div[id^="item_"]') !== null && /Kindle/.test(node.querySelector('span[id^="item-byline-"]').innerText)) {
      node.getElementsByTagName('div')[0].classList.add('SPAW_FETCHED');
      node.getElementsByClassName('a-price-symbol')[0].textContent = '＞';
      const asin = JSON.parse(node.getElementsByClassName('price-section')[0].attributes["data-item-prime-info"].value).asin;
      const cache = loadCache(asin);
      if (cache !== null) {
        showPoint(node, cache);
        return;
      }
      fetch('https://www.amazon.co.jp/dp/' + asin, {
        credentials: 'include'
      }).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.text();
      }).then((text) => {
        const html = domParser.parseFromString(text, 'text/html');
        const data = getPoint(html);
        saveCache(asin, data);
        showPoint(node, data);
      }).catch((error) => console.error(error));
    }
  });
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        fetchPoint(node);
      }
    }
  });
  const main = ((node) => {
    expirationCache();
    for (const node of document.getElementsByClassName('g-item-sortable')) {
      fetchPoint(node);
    }
    observer.observe(document.getElementById('g-items'), {
      childList: true,
      subtree: true,
    });
  });
  fetch('https://www.amazon.co.jp/gp/product/black-curtain-redirect.html', {
    credentials: 'include'
  }).then(() => main());
})();