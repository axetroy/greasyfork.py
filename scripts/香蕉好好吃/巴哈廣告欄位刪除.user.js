// ==UserScript==
// @name         巴哈廣告欄位刪除
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      https://forum.gamer.com.tw*
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var elements = document.getElementsByClassName("b-list_ad");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
})();

