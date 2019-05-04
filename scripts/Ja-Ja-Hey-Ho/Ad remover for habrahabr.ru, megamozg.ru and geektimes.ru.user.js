// ==UserScript==
// @name        Ad remover for habrahabr.ru, megamozg.ru and geektimes.ru
// @namespace   habrahabr_ru
// @description Removes upper block with an offer to disable AdBlock on habrahabr.ru, megamozg.ru and geektimes.ru
// @description:ru Убирает плашку сверху с предложением отключить AdBlock на habrahabr.ru, megamozg.ru и geektimes.ru
// @include     http://habrahabr.ru/*
// @include     https://habrahabr.ru/*
// @include     http://megamozg.ru/*
// @include     https://megamozg.ru/*
// @include     http://geektimes.ru/*
// @include     https://geektimes.ru/*
// @version     1
// @license     MIT
// @grant       none
// ==/UserScript==

var el = document.querySelector('div a[href^="/adblock"]'),
    parent;
if (el != null && (parent = el.parentElement)) {
    parent.remove();
}
