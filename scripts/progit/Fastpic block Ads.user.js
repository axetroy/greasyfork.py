// ==UserScript==
// @name        Fastpic block Ads
// @description Блокировка рекламы на fastpic.ru . Как дополнение к блокировке с помощью CSS: https://userstyles.org/styles/121886/
// @namespace   FastpicAds
// @include     http://fastpic.ru/*
// @grant       none
// @version 0.0.1.20160502022555
// ==/UserScript==

$(document).ready(function () {
  $('html,body,#fff,#picContainer').click(function (e) {
    if (e.target === this) {
      window.location = '';
    }
  })
})
