// ==UserScript==
// @name         Anti-AdBlock killer for cnBeta
// @namespace    http://leedy.me/
// @version      0.3
// @description  移除 cnBeta 的恼人弹窗
// @author       Leedy
// @match        http://www.cnbeta.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (window.$) $('.mask-close').parent().parent().remove();
})();