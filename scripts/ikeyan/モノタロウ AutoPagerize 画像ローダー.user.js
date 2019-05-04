// ==UserScript==
// @name モノタロウ AutoPagerize 画像ローダー
// @description モノタロウ www.monotaro.com の検索ページでAutoPagerizeを使ったとき、自動で継ぎ足されたページの画像が表示されない問題を修正します。
// @namespace Violentmonkey Scripts
// @match https://www.monotaro.com/*
// @grant none
// @version 0.0.1.20180408134235
// ==/UserScript==

window.addEventListener('GM_AutoPagerizeNextPageLoaded', (e) => {
  console.log("GM_AutoPagerizeNextPageLoaded", e);
  var imgs = document.querySelectorAll("img[data-rep-img-src]");
  Array.from(imgs).forEach(img => {
    img.src = img.getAttribute("data-rep-img-src");
  });
}, false);
