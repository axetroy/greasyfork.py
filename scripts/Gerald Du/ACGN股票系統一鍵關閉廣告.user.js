// ==UserScript==
// @name         ACGN股票系統一鍵關閉廣告
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  煩人的廣告走開！
// @author       frozenmouse
// @match        http://acgn-stock.com/*
// @match        https://acgn-stock.com/*
// @grant        none
// ==/UserScript==

(function() {
    const insertionTarget = $(".note")[2];

    const closeAdsButton = $(`
      <div class="note">
        <li class="nav-item">
          <a class="nav-link" href="#">一鍵關廣告</a>
        </li>
      </div>
    `);
    closeAdsButton.insertAfter(insertionTarget);
    closeAdsButton.find("a").on("click", () => $(".fixed-bottom a.btn").click());
})();