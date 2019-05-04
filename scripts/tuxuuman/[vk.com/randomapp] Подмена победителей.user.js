// ==UserScript==
// @name         [vk.com/randomapp] Подмена победителей
// @namespace    vk.com/randomapp
// @version      0.1
// @description  Подменяет победителя в конкурсе. Данный скрипт не будет работать без специального расширения. За подробностями обращайтесь к автору
// @author       tuxuuman<vk.com/tuxuuman, tuxuuman@gmail.com>
// @match        *://yap.by/*
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    unsafeWindow.__winners = [1, 222, 656, 47543]; // сюда вписыаем id победителей через запятую.

    var currentWinnerIdx = 0;

    if (unsafeWindow.__winners.length) {
        unsafeWindow.__getWinners = function() {
            return [unsafeWindow.__winners[currentWinnerIdx++] || unsafeWindow.__winners[currentWinnerIdx = 0]];
        }
    }
})();