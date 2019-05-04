// ==UserScript==
// @name         List Maker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @Match        http://items.jellyneo.net/search/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var content = document.getElementsByClassName("small-block-grid-3 large-block-grid-5 text-center word-wrap-break-word")[0];
    var result = content.innerHTML.match(/<a href="\/item\/\d+?\/">(?:\w+? ?){1,9}<\/a>/g);
    content.innerHTML = result.join('<br />');

})();