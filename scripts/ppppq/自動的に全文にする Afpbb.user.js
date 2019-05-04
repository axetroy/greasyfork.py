// ==UserScript==
// @name         自動的に全文にする Afpbb
// @namespace    https://greasyfork.org/ja/users/6866-ppppq
// @version      0.2.20190312
// @description  自動的に全文にする
// @author       You
// @match        *://www.afpbb.com/articles/-/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var loc = document.location;
    var url = new URL(loc.href);
    var search = url.search;
    var fullPageMarker = 'act=all';

    if (!search.includes(fullPageMarker)) {
        if (search.length === 0) {
            url.search = fullPageMarker;
        } else {
            url.search += `&${fullPageMarker}`;
        }
        loc.replace(url.href);
    }
})();