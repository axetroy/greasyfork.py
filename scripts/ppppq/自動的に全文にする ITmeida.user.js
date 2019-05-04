// ==UserScript==
// @name         自動的に全文にする ITmeida
// @namespace    https://greasyfork.org/ja/users/6866-ppppq
// @version      0.4.20190214
// @description  自動的に全文にする
// @author       You
// @match        *://*.itmedia.co.jp/*/spv/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var loc = document.location;
    var url = new URL(loc.href);

    if (url.pathname.includes('_0.html')) {
        url.pathname = url.pathname.replace('_0.html', '.html');
        loc.replace(url.href);
    }
})();