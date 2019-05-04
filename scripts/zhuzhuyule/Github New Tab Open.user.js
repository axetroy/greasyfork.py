// ==UserScript==
// @name         Github New Tab Open
// @namespace    http://tampermonkey.net/
// @icon         https://favicon.yandex.net/favicon/github.com
// @version      0.2-20180226
// @description  try to take over the world!
// @author       zhuzhuyule
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var base = document.createElement('base');
    base.setAttribute('target','_blank');
    document.querySelector('html>head').append(base);
})();