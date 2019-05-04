// ==UserScript==
// @name         楽天市場（購入時メルマガ自動チェックOFF）
// @namespace    rakuten
// @version      0.1
// @description  楽天で商品を購入するとき、メルマガ購読のチェックを自動でOFFにする
// @author       nikukoppun
// @include      https://basket.step.rakuten.co.jp/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (0 < jQuery("img#clearMailMagazine").size()) {
        jQuery("img#clearMailMagazine").click();
    }
})();