// ==UserScript==
// @name         IMDB Orjinal title
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  IMDB Orjinal Title
// @author       cevherkarakoc
// @include     http://www.imdb.com/title/tt*
// @include     https://www.imdb.com/title/tt*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var orginalTitle = document.querySelector(".originalTitle").innerText.replace("(original title)", "");
    var yearElm = document.querySelector("#titleYear").innerHTML;
    var title = document.querySelector(".title_wrapper").firstElementChild;
    document.querySelector(".originalTitle").innerText = title.innerText;
    title.innerHTML = orginalTitle + yearElm;

})();