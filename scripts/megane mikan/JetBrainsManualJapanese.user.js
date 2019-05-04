// ==UserScript==
// @name         JetBrainsManualJapanese
// @namespace    mikan-megane.JetBrainsManualJapanese
// @version      1.0
// @description  JetBrainsマニュアルの日本翻訳版ページと公式を行ったり来たり出来ます
// @author       mikan-megane
// @match        https://www.jetbrains.com/help/*
// @match        https://pleiades.io/help/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var official = location.hostname == 'www.jetbrains.com';

    function toggleJapanese(e) {
        e.preventDefault();
        location.hostname = official ? 'pleiades.io' : 'www.jetbrains.com';
    }

    var wapper = document.createElement('div');
    wapper.setAttribute('class', 'group__item');
    var link = document.createElement('a');
    link.setAttribute('href', 'https://' + (official ? 'pleiades.io' : 'www.jetbrains.com') + '/help/');
    link.setAttribute('class', 'dropdown__trigger-value');
    link.appendChild(document.createTextNode(official ? '日本語ページへ' : '公式ページへ'));
    link.addEventListener('click', toggleJapanese,false);
    wapper.appendChild(link);
    var $links = document.querySelector('.header__links');
    $links.insertBefore(wapper, $links.firstChild);

})();