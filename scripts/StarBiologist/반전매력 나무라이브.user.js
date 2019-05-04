// ==UserScript==
// @name         반전매력 나무라이브
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  나무라이브의 '반전'
// @author       StarBiologist
// @match        https://namu.live/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var div = document.getElementsByClassName('body')[0];
    div.style.filter = 'invert(100%)';

})();