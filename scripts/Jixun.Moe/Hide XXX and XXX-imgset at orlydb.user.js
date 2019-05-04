// ==UserScript==
// @name         Hide XXX and XXX-imgset at orlydb
// @namespace    org.jixun
// @version      0.1
// @description  enter something useful
// @author       Jixun
// @include      http://www.orlydb.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

var disallowed = ['XXX', 'XXX-IMGSET'];
[].forEach.call(document.querySelectorAll('#releases>div'), function (row) {
    var cat = row.querySelector('.section>a');
    if (cat && disallowed.indexOf(cat.textContent.trim()) != -1) {
        row.parentNode.removeChild(row);
    }
});