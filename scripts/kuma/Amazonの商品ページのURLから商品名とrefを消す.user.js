// ==UserScript==
// @name         Amazonの商品ページのURLから商品名とrefを消す
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       kuma
// @match        https://www.amazon.co.jp/*/dp/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  history.pushState(null, null, location.href.replace(/co.jp\/(.*)\/dp/, 'co.jp/dp').replace(/ref=.*$/, ''));
})();